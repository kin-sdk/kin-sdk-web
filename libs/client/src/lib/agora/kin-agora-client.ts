import {
  agoraRequest,
  bs58encode,
  CreateAccountResponse,
  GetAccountInfoResponse,
  getAgoraUrls,
  getCreateAccountTx,
  GetMinimumBalanceForRentExemptionResponse,
  GetRecentBlockhashRequest,
  GetRecentBlockhashResponse,
  GetServiceConfigRequest,
  GetServiceConfigResponse,
  KinEnvironment,
  PrivateKey,
  PublicKey,
  quarksToKin,
  ResolveTokenAccountsResponse,
  ServiceConfigKeys,
  SolanaAccount,
  SolanaAccountId,
  SolanaPublicKey,
  SubmitTransactionResponse,
  Transaction,
} from '@kin-sdk/core'
import { retry } from 'ts-retry-promise'

import {
  serializeCreateAccountRequest,
  serializeGetBalanceRequest,
  serializeMinBalanceReq,
  serializeGetTokenAccountBalanceRequest,
  serializeResolveTokenAccountsRequest,
  serializeSubmitPaymentRequest,
  serializeSubmitPaymentTransaction,
  serializeSubmitTransactionRequest,
} from './kin-agora-request-serializers'

import { handleCreateAccountResponse, handleSubmitTransactionResponse } from './kin-agora-response-handlers'
import { SubmitPaymentOptions } from './submit-payment-options'

export class KinAgoraClient {
  private serviceConfig: {
    tokenProgram: Uint8Array
    token: Uint8Array
    subsidizer: Uint8Array
  }

  private readonly urls: {
    getRecentBlockhashURL: string
    getServiceConfigURL: string
    createAccountURL: string
    getMinBalanceURL: string
    submitTransactionURL: string
    resolveTokenAccountsURL: string
    getAccountInfoURL: string
  }

  constructor(private readonly env: KinEnvironment) {
    this.urls = getAgoraUrls(env)
  }

  async createAccount(secret: string): Promise<[string, string?]> {
    await this.ensureServiceConfig()
    const owner = PrivateKey.fromString(secret)

    const [result, error] = await this.createAccountTransaction(owner).then((tx) => this.createAccountRequest(tx))

    await retry(
      () => {
        console.log('Trying!!')
        return this.resolveTokenAccounts(owner.publicKey().toBase58()).then((res) => {
          console.log('resolve', res)
          return res
        })
      },
      { retries: 10, backoff: 'EXPONENTIAL' },
    )
    return [result, error]
  }

  async getBalance(publicKey: string): Promise<[string, string?]> {
    return agoraRequest(this.urls?.getAccountInfoURL, serializeGetBalanceRequest(publicKey))
      .then((res) => GetAccountInfoResponse.deserializeBinary(res.data))
      .then((response) =>
        response.getResult() === GetAccountInfoResponse.Result.NOT_FOUND
          ? [null, `Account could not be found`]
          : [response?.getAccountInfo()?.getBalance()],
      )
  }

  async resolveTokenAccounts(publicKey: string): Promise<[any[], string?]> {
    return agoraRequest(this.urls?.resolveTokenAccountsURL, serializeResolveTokenAccountsRequest(publicKey))
      .then((res) => ResolveTokenAccountsResponse.deserializeBinary(res.data))
      .then((res) => this.handleResolveTokenResponse(res.getTokenAccountsList()))
  }

  async submitPayment(options: SubmitPaymentOptions): Promise<[string, string?]> {
    await this.ensureServiceConfig()
    const [pk, transaction] = serializeSubmitPaymentTransaction(
      options,
      this.serviceConfig.subsidizer,
      this.serviceConfig.tokenProgram,
    )

    return this.getRecentBlockhash().then((resp) =>
      this.submitTransaction(serializeSubmitPaymentRequest(pk, transaction, resp)),
    )
  }

  private async ensureServiceConfig() {
    if (!this.serviceConfig) {
      this.serviceConfig = await this.getServiceConfig()
    }
  }

  private async handleResolveTokenResponse(tokenAccounts: SolanaAccountId[]): Promise<[any[], string?]> {
    if (tokenAccounts.length == 0) {
      return [null, `No Kin token accounts found`]
    }

    const balances = await Promise.all(tokenAccounts.map((tokenAccount) => this.getTokenAccountBalance(tokenAccount)))

    return [balances]
  }

  private getServiceConfigKeys(owner: PrivateKey): ServiceConfigKeys {
    const tokenProgram = new SolanaPublicKey(this.serviceConfig?.tokenProgram)
    const tokenKey = new SolanaPublicKey(this.serviceConfig?.token)
    const subsidizer: SolanaPublicKey = this.serviceConfig?.subsidizer
      ? new SolanaPublicKey(this.serviceConfig?.subsidizer)
      : owner.publicKey().solanaKey()

    return { tokenKey, tokenProgram, subsidizer }
  }

  private async createAccountTransaction(owner: PrivateKey): Promise<Transaction> {
    return this.getRecentBlockhash()
      .then((res) => bs58encode(Buffer.from(res.getBlockhash()!.getValue_asU8())))
      .then((recentBlockhash) =>
        agoraRequest(this.urls?.getMinBalanceURL, serializeMinBalanceReq())
          .then((res) => GetMinimumBalanceForRentExemptionResponse.deserializeBinary(res.data))
          .then((res) => {
            const tx = getCreateAccountTx(
              recentBlockhash,
              owner.publicKey().solanaKey(),
              this.getServiceConfigKeys(owner),
              res.getLamports(),
            )
            tx.partialSign(new SolanaAccount(owner.secretKey()))

            const protoTx = new Transaction()

            protoTx.setValue(tx.serialize({ requireAllSignatures: false, verifySignatures: false }))

            return protoTx
          }),
      )
  }

  private createAccountRequest(protoTx: Transaction): Promise<[string, string?]> {
    return agoraRequest(this.urls?.createAccountURL, serializeCreateAccountRequest(protoTx))
      .then((res) => CreateAccountResponse.deserializeBinary(res.data))
      .then((res) => handleCreateAccountResponse(res))
  }

  private getServiceConfig() {
    return agoraRequest(this.urls?.getServiceConfigURL, new GetServiceConfigRequest().serializeBinary())
      .then((res) => GetServiceConfigResponse.deserializeBinary(res.data))
      .then((res) => ({
        tokenProgram: res.getTokenProgram().getValue_asU8(),
        token: res.getToken().getValue_asU8(),
        subsidizer: res.getSubsidizerAccount() ? res.getSubsidizerAccount().getValue_asU8() : undefined,
      }))
  }

  private getRecentBlockhash() {
    return agoraRequest(
      this.urls?.getRecentBlockhashURL,
      new GetRecentBlockhashRequest().serializeBinary(),
    ).then((res) => GetRecentBlockhashResponse.deserializeBinary(res.data))
  }

  private getTokenAccountBalance(tokenAccount: SolanaAccountId) {
    return agoraRequest(this.urls?.getAccountInfoURL, serializeGetTokenAccountBalanceRequest(tokenAccount))
      .then((res) => GetAccountInfoResponse.deserializeBinary(res.data))
      .then((res) => ({
        account: new PublicKey(Buffer.from(tokenAccount.getValue_asU8())).toBase58(),
        balance: quarksToKin(res.getAccountInfo().getBalance()),
      }))
  }

  private submitTransaction(tx: Transaction): Promise<[string, string?]> {
    return agoraRequest(this.urls?.submitTransactionURL, serializeSubmitTransactionRequest(tx))
      .then((res) => SubmitTransactionResponse.deserializeBinary(res.data))
      .then((res) => handleSubmitTransactionResponse(res))
  }
}
