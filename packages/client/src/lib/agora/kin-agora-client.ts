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
  RequestAirdropResponse,
  ResolveTokenAccountsResponse,
  ServiceConfigKeys,
  SolanaAccount,
  SolanaAccountId,
  SolanaPublicKey,
  SubmitTransactionResponse,
  Transaction,
} from '@kin-sdk/core'

import {
  serializeCreateAccountRequest,
  serializeRequestAirdropRequest,
  serializeGetBalanceRequest,
  serializeGetTokenAccountBalanceRequest,
  serializeMinBalanceReq,
  serializeResolveTokenAccountsRequest,
  serializeSubmitPaymentRequest,
  serializeSubmitPaymentTransaction,
  serializeSubmitTransactionRequest,
} from './kin-agora-request-serializers'

import {
  handleCreateAccountResponse,
  handleRequestAirdropResponse,
  handleSubmitTransactionResponse,
} from './kin-agora-response-handlers'
import { SubmitPaymentOptions } from './submit-payment-options'

export interface KinAgoraClientOptions {
  appIndex?: number
}
export interface KinAccountBalance {
  account?: string
  balance?: string
}

export class KinAgoraClient {
  private serviceConfig: {
    tokenProgram: Uint8Array
    token: Uint8Array
    subsidizer: Uint8Array
  }

  private readonly urls: {
    createAccountURL: string
    getAccountInfoURL: string
    requestAirdropURL: string
    getMinBalanceURL: string
    getRecentBlockhashURL: string
    getServiceConfigURL: string
    getBalancesURL: string
    submitTransactionURL: string
  }

  constructor(private readonly env: KinEnvironment, private readonly options?: KinAgoraClientOptions) {
    this.urls = getAgoraUrls(env)
  }

  async createAccount(secret: string): Promise<[string, string?]> {
    await this.ensureServiceConfig()
    const owner = PrivateKey.fromString(secret)

    return this.createAccountTransaction(owner).then((tx) => this.createAccountRequest(tx))
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

  async getBalances(publicKey: string): Promise<[KinAccountBalance[], string?]> {
    return agoraRequest(this.urls?.getBalancesURL, serializeResolveTokenAccountsRequest(publicKey))
      .then((res) => ResolveTokenAccountsResponse.deserializeBinary(res.data))
      .then((res) => this.handleResolveTokenResponse(res.getTokenAccountsList()))
  }

  requestAirdrop(publicKey: string, amount: string): Promise<[string, string?]> {
    return agoraRequest(this.urls?.requestAirdropURL, serializeRequestAirdropRequest(publicKey, amount))
      .then((res) => RequestAirdropResponse.deserializeBinary(res.data))
      .then((res) => handleRequestAirdropResponse(res))
  }

  async submitPayment(options: SubmitPaymentOptions): Promise<[string, string?]> {
    await this.ensureServiceConfig()
    const [pk, transaction] = serializeSubmitPaymentTransaction(
      options,
      this.serviceConfig.subsidizer,
      this.serviceConfig.tokenProgram,
      this.options.appIndex,
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

  private async handleResolveTokenResponse(accounts: SolanaAccountId[]): Promise<[KinAccountBalance[], string?]> {
    if (accounts.length == 0) {
      return [null, `No Kin token accounts found`]
    }

    const balances = await Promise.all(accounts.map((account) => this.getTokenAccountBalance(account)))

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
    await this.ensureServiceConfig()
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

  private getTokenAccountBalance(tokenAccount: SolanaAccountId): Promise<KinAccountBalance> {
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
