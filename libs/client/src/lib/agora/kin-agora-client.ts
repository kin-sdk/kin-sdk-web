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
  Keypair,
  KinEnvironment,
  kinToQuarks,
  MemoProgram,
  PrivateKey,
  PublicKey,
  quarksToKin,
  ResolveTokenAccountsRequest,
  ResolveTokenAccountsResponse,
  SolanaAccount,
  SolanaAccountId,
  SolanaPublicKey,
  SolanaTransaction,
  SubmitTransactionResponse,
  TokenProgram,
  Transaction,
} from '@kin-sdk/core'

import {
  serializeCreateAccountRequest,
  serializeGetBalanceRequest,
  serializeGetRecentBlockHash,
  serializeGetTokenAccountBalanceRequest,
  serializeSubmitTransactionRequest,
} from './kin-agora-request-serializers'
import { handleCreateAccountResponse, handleSubmitTransactionResponse } from './kin-agora-response-handlers'

export interface SubmitPaymentOptions {
  amount: string
  destination: string
  tokenAccount: string
  memo?: string
  secret: string
}

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

  private getRecentBlockhash() {
    return agoraRequest(
      this.urls?.getRecentBlockhashURL,
      new GetRecentBlockhashRequest().serializeBinary(),
    ).then((res) => GetRecentBlockhashResponse.deserializeBinary(res.data))
  }

  private async ensureServiceConfig() {
    if (!this.serviceConfig) {
      this.serviceConfig = await this.getServiceConfig()
    }
  }

  private async handleResolveTokenResponse(
    tokenAccounts: SolanaAccountId[],
  ): Promise<{ balances?: any; error?: string }> {
    if (tokenAccounts.length == 0) {
      return { error: `No Kin token accounts found` }
    }

    const balances = await Promise.all(tokenAccounts.map((tokenAccount) => this.getTokenAccountBalance(tokenAccount)))

    return { balances }
  }

  private getTokenAccountBalance(tokenAccount: SolanaAccountId) {
    return agoraRequest(this.urls?.getAccountInfoURL, serializeGetTokenAccountBalanceRequest(tokenAccount))
      .then((res) => GetAccountInfoResponse.deserializeBinary(res.data))
      .then((res) => ({
        account: new PublicKey(Buffer.from(tokenAccount.getValue_asU8())).toBase58(),
        balance: quarksToKin(res.getAccountInfo().getBalance()),
      }))
  }

  private async createAccountTransaction(owner: PrivateKey): Promise<Transaction> {
    await this.ensureServiceConfig()
    const tokenProgramKey = new SolanaPublicKey(this.serviceConfig?.tokenProgram)
    const tokenKey = new SolanaPublicKey(this.serviceConfig?.token)

    let subsidizerKey: SolanaPublicKey

    if (this.serviceConfig?.subsidizer) {
      subsidizerKey = new SolanaPublicKey(this.serviceConfig?.subsidizer)
    } else {
      subsidizerKey = owner.publicKey().solanaKey()
    }

    return this.getRecentBlockhash()
      .then((res) => bs58encode(Buffer.from(res.getBlockhash()!.getValue_asU8())))
      .then((recentBlockhash) =>
        agoraRequest(this.urls?.getMinBalanceURL, serializeGetRecentBlockHash())
          .then((res) => GetMinimumBalanceForRentExemptionResponse.deserializeBinary(res.data))
          .then((res) => {
            const tx = getCreateAccountTx(
              recentBlockhash,
              owner.publicKey().solanaKey(),
              owner.publicKey().solanaKey(),
              subsidizerKey,
              tokenProgramKey,
              tokenKey,
              res.getLamports(),
            )
            tx.partialSign(new SolanaAccount(owner.secretKey()))

            const protoTx = new Transaction()
            protoTx.setValue(
              tx.serialize({
                requireAllSignatures: false,
                verifySignatures: false,
              }),
            )

            return protoTx
          }),
      )
  }

  private createAccountRequest(protoTx: Transaction): Promise<{ result?: any; error?: string }> {
    return agoraRequest(this.urls?.createAccountURL, serializeCreateAccountRequest(protoTx))
      .then((res) => CreateAccountResponse.deserializeBinary(res.data))
      .then((res) => handleCreateAccountResponse(res))
  }

  async createAccount(secret: string): Promise<{ result?: any; error?: string }> {
    await this.ensureServiceConfig()
    const owner = PrivateKey.fromString(secret)

    return this.createAccountTransaction(owner).then((tx) => {
      return this.createAccountRequest(tx)
    })
  }

  resolveTokenAccounts(publicKey: string): Promise<{ balances?: any; error?: string }> {
    const accountID = new SolanaAccountId()
    accountID.setValue(PublicKey.fromBase58(publicKey.trim()).buffer)
    const req = new ResolveTokenAccountsRequest()
    req.setAccountId(accountID)

    return agoraRequest(this.urls?.resolveTokenAccountsURL, req.serializeBinary())
      .then((res) => ResolveTokenAccountsResponse.deserializeBinary(res.data))
      .then((res) => this.handleResolveTokenResponse(res.getTokenAccountsList()))
  }

  getBalance(publicKey: string): Promise<[string, string?]> {
    return agoraRequest(this.urls?.getAccountInfoURL, serializeGetBalanceRequest(publicKey))
      .then((res) => GetAccountInfoResponse.deserializeBinary(res.data))
      .then((response) => {
        if (response.getResult() === GetAccountInfoResponse.Result.NOT_FOUND) {
          return [null, `Account could not be found`]
        }

        return [response?.getAccountInfo()?.getBalance()]
      })
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

  private createSolanaTransaction({
    publicKey,
    tokenAccount,
    destination,
    kinAmount,
    memo,
    tokenProgram,
    subsidizer,
  }): SolanaTransaction {
    const owner = PublicKey.fromBase58(publicKey).solanaKey()
    let feePayer: SolanaPublicKey
    if (subsidizer) {
      feePayer = new SolanaPublicKey(subsidizer)
    } else {
      feePayer = owner
    }
    const instructions = []

    if (memo?.length) {
      instructions.push(MemoProgram.memo({ data: memo }))
    }

    instructions.push(
      TokenProgram.transfer(
        {
          source: PublicKey.fromBase58(tokenAccount).solanaKey(),
          dest: PublicKey.fromBase58(destination).solanaKey(),
          owner,
          amount: BigInt(kinToQuarks(kinAmount.toString())),
        },
        new SolanaPublicKey(tokenProgram),
      ),
    )

    return new SolanaTransaction({
      feePayer: feePayer,
    }).add(...instructions)
  }

  async submitPayment({
    amount,
    tokenAccount,
    destination,
    memo,
    secret,
  }: SubmitPaymentOptions): Promise<[string, string?]> {
    await this.ensureServiceConfig()
    const pk: PrivateKey = PrivateKey.fromString(secret)
    const transaction = this.createSolanaTransaction({
      publicKey: Keypair.fromSecret(secret).publicKey,
      tokenAccount,
      destination,
      kinAmount: amount,
      memo,
      subsidizer: this.serviceConfig?.subsidizer,
      tokenProgram: this.serviceConfig?.tokenProgram,
    })

    return agoraRequest(this.urls?.getRecentBlockhashURL, new GetRecentBlockhashRequest().serializeBinary())
      .then((res) => GetRecentBlockhashResponse.deserializeBinary(res.data))
      .then((resp) => {
        transaction.recentBlockhash = bs58encode(Buffer.from(resp.getBlockhash()!.getValue_asU8()))
        transaction.partialSign(new SolanaAccount(pk.secretKey()))
        const protoTx = new Transaction()
        protoTx.setValue(
          transaction.serialize({
            requireAllSignatures: false,
            verifySignatures: false,
          }),
        )
        return this.submitTransaction(protoTx)
      })
  }

  private submitTransaction(tx: Transaction): Promise<[string, string?]> {
    return agoraRequest(this.urls?.submitTransactionURL, serializeSubmitTransactionRequest(tx))
      .then((res) => SubmitTransactionResponse.deserializeBinary(res.data))
      .then((res) => handleSubmitTransactionResponse(res))
  }
}
