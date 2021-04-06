import {
  AccountSize,
  Commitment,
  CreateAccountRequest,
  CreateAccountResponse,
  GetAccountInfoRequest,
  GetAccountInfoResponse,
  getAgoraUrls,
  getCreateAccountTx,
  GetMinimumBalanceForRentExemptionRequest,
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
  SubmitTransactionRequest,
  SubmitTransactionResponse,
  TokenProgram,
  Transaction,
  TransactionError,
} from '@kin-wallet/sdk'
import axios, { AxiosResponse } from 'axios'
import * as bs58 from 'bs58'

export class KinClient {
  private serviceConfig: {
    tokenProgram: Uint8Array
    token: Uint8Array
    subsidizer: Uint8Array
  }
  private urls: {
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

  async ensureServiceConfig() {
    if (!this.serviceConfig) {
      this.serviceConfig = await this.getServiceConfig()
      console.log('this.serviceConfig, ', this.serviceConfig)
    }
  }

  getRecentBlockhash() {
    const req = new GetRecentBlockhashRequest()

    return this.submitAgoraReq(this.urls?.getRecentBlockhashURL, req.serializeBinary()).then((res) =>
      GetRecentBlockhashResponse.deserializeBinary(res.data),
    )
  }

  async createAccount(secret: string): Promise<{ result?: any; error?: string }> {
    await this.ensureServiceConfig()
    const owner = PrivateKey.fromString(secret)
    console.log('secret', secret)
    console.log('owner', owner)

    return this.createAccountTransaction(owner).then((tx) => {
      return this.createAccountRequest(tx)
    })
  }

  resolveTokenAccounts(publicKey: string): Promise<{ balances?: any; error?: string }> {
    const accountID = new SolanaAccountId()
    accountID.setValue(PublicKey.fromBase58(publicKey.trim()).buffer)
    const req = new ResolveTokenAccountsRequest()
    req.setAccountId(accountID)

    return this.submitAgoraReq(this.urls?.resolveTokenAccountsURL, req.serializeBinary())
      .then((res) => ResolveTokenAccountsResponse.deserializeBinary(res.data))
      .then((res) => this.handleResolveTokenResponse(res.getTokenAccountsList()))
  }

  async handleResolveTokenResponse(tokenAccounts: SolanaAccountId[]): Promise<{ balances?: any; error?: string }> {
    if (tokenAccounts.length == 0) {
      return { error: `No Kin token accounts found` }
    }

    const balances = await Promise.all(tokenAccounts.map((tokenAccount) => this.getTokenAccountBalance(tokenAccount)))

    return { balances }
  }

  getTokenAccountBalance(tokenAccount: SolanaAccountId) {
    const req = new GetAccountInfoRequest()
    req.setAccountId(tokenAccount)
    req.setCommitment(Commitment.SINGLE)

    const accountID = new PublicKey(Buffer.from(tokenAccount.getValue_asU8())).toBase58()

    return this.submitAgoraReq(this.urls?.getAccountInfoURL, req.serializeBinary())
      .then((res) => GetAccountInfoResponse.deserializeBinary(res.data))
      .then((res) => {
        return {
          account: accountID,
          balance: quarksToKin(res.getAccountInfo().getBalance()),
        }
      })
  }

  async createAccountTransaction(owner: PrivateKey): Promise<Transaction> {
    await this.ensureServiceConfig()
    const tokenProgramKey = new SolanaPublicKey(this.serviceConfig?.tokenProgram)
    const tokenKey = new SolanaPublicKey(this.serviceConfig?.token)

    let subsidizerKey: SolanaPublicKey

    if (this.serviceConfig?.subsidizer) {
      subsidizerKey = new SolanaPublicKey(this.serviceConfig?.subsidizer)
    } else {
      subsidizerKey = owner.publicKey().solanaKey()
    }

    return this.getRecentBlockhash().then((res) => {
      const recentBlockhash = bs58.encode(Buffer.from(res.getBlockhash()!.getValue_asU8()))
      const minBalanceReq = new GetMinimumBalanceForRentExemptionRequest()
      minBalanceReq.setSize(AccountSize)

      return this.submitAgoraReq(this.urls?.getMinBalanceURL, minBalanceReq.serializeBinary())
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
        })
    })
  }

  createAccountRequest(protoTx: Transaction): Promise<{ result?: any; error?: string }> {
    const createReq = new CreateAccountRequest()
    createReq.setTransaction(protoTx)
    createReq.setCommitment(Commitment.SINGLE)

    return this.submitAgoraReq(this.urls?.createAccountURL, createReq.serializeBinary())
      .then((res) => CreateAccountResponse.deserializeBinary(res.data))
      .then((res) => this.handleCreateAccountResponse(res))
  }

  handleCreateAccountResponse(res: CreateAccountResponse): { result?: any; error?: string } {
    switch (res.getResult()) {
      case CreateAccountResponse.Result.OK:
        return {
          result: `Submitted transaction to create token account ${bs58.encode(
            res.getAccountInfo().getAccountId().getValue_asU8(),
          )} with single commitment.`,
        }
      case CreateAccountResponse.Result.EXISTS:
        return {
          error: 'An account with the randomly generated address exists. Please try again.',
        }
      case CreateAccountResponse.Result.PAYER_REQUIRED:
        return {
          error:
            'The transaction to create a token account failed because the transaction subsidizer did not sign the transaction.',
        }
      case CreateAccountResponse.Result.BAD_NONCE:
        return {
          error: 'The transaction to create a token account failed because of a bad nonce. Please try again.',
        }
      default:
        return { error: 'Something went wrong. Please reload' }
    }
  }

  getBalance(publicKey: string): Promise<string> {
    const solAccountID = new SolanaAccountId()
    solAccountID.setValue(PublicKey.fromBase58(publicKey).buffer)
    const req = new GetAccountInfoRequest()
    req.setAccountId(solAccountID)
    req.setCommitment(Commitment.SINGLE)

    return this.submitAgoraReq(this.urls?.getAccountInfoURL, req.serializeBinary()).then((res) => {
      const response = GetAccountInfoResponse.deserializeBinary(res.data)

      if (response.getResult() === GetAccountInfoResponse.Result.NOT_FOUND) {
        throw new Error(`Account could not be found`)
      }

      return response?.getAccountInfo()?.getBalance()
    })
  }

  getServiceConfig() {
    const req = new GetServiceConfigRequest()
    return this.submitAgoraReq(this.urls?.getServiceConfigURL, req.serializeBinary())
      .then((res) => GetServiceConfigResponse.deserializeBinary(res.data))
      .then((res) => {
        let subsidizer: Uint8Array | undefined

        if (res.getSubsidizerAccount()) {
          subsidizer = res.getSubsidizerAccount().getValue_asU8()
        }

        return {
          tokenProgram: res.getTokenProgram().getValue_asU8(),
          token: res.getToken().getValue_asU8(),
          subsidizer: subsidizer,
        }
      })
      .then((res) => {
        console.log('res', res)
        return res
      })
  }

  submitAgoraReq(url: string, data: Uint8Array): Promise<AxiosResponse> {
    return axios.request({
      method: 'post',
      url: url,
      data: data,
      headers: {
        'Content-Type': 'application/proto',
      },
      responseType: 'arraybuffer',
    })
  }

  createSolanaTransaction({
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
  }: {
    amount: string
    destination: string
    tokenAccount: string
    memo?: string
    secret: string
  }) {
    const transaction = this.createSolanaTransaction({
      publicKey: Keypair.fromSecret(secret).publicKey,
      tokenAccount,
      destination,
      kinAmount: amount,
      memo,
      subsidizer: this.serviceConfig?.subsidizer,
      tokenProgram: this.serviceConfig?.tokenProgram,
    })

    let pk: PrivateKey
    try {
      pk = PrivateKey.fromString(secret)
    } catch (_) {
      pk = PrivateKey.fromBase58(secret)
    }

    const req = new GetRecentBlockhashRequest()

    return this.submitAgoraReq(this.urls?.getRecentBlockhashURL, req.serializeBinary())
      .then((res) => GetRecentBlockhashResponse.deserializeBinary(res.data))
      .then((resp) => {
        transaction.recentBlockhash = bs58.encode(Buffer.from(resp.getBlockhash()!.getValue_asU8()))
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

  submitTransaction(tx: Transaction) {
    const submitReq = new SubmitTransactionRequest()
    submitReq.setTransaction(tx)
    submitReq.setCommitment(Commitment.SINGLE)

    return this.submitAgoraReq(this.urls?.submitTransactionURL, submitReq.serializeBinary())
      .then((res) => SubmitTransactionResponse.deserializeBinary(res.data))
      .then((res) => this.handleSubmitTransactionResponse(res))
  }

  handleSubmitTransactionResponse(res: SubmitTransactionResponse) {
    switch (res.getResult()) {
      case SubmitTransactionResponse.Result.OK:
      case SubmitTransactionResponse.Result.ALREADY_SUBMITTED:
        console.log({
          type: 'SET_SUBMITTED_TRANSACTION',
          payload: {
            submitResponse: res,
            signature: res.getSignature().getValue_asU8(),
          },
        })
        break
      case SubmitTransactionResponse.Result.FAILED:
        switch (res.getTransactionError().getReason()) {
          case TransactionError.Reason.UNAUTHORIZED:
            console.log(['The transaction failed due to a signature error'])
            break
          case TransactionError.Reason.BAD_NONCE:
            console.log(['The transaction failed because of a bad nonce. Please try again.'])
            break
          case TransactionError.Reason.INSUFFICIENT_FUNDS:
            console.log(['The transaction failed because of insufficient funds.'])
            break
          case TransactionError.Reason.INVALID_ACCOUNT:
            console.log(['The transaction failed because of an invalid account. Please check your account values'])
            break
          default:
            console.log(['The transaction failed for an unknown reason'])
        }
        break
      case SubmitTransactionResponse.Result.REJECTED:
        console.log(['The transaction was rejected by the configured webhook'])
        break
      case SubmitTransactionResponse.Result.INVOICE_ERROR:
        console.log(['The transaction was rejected by the configured webhook because of an invoice error.'])
        break
      case SubmitTransactionResponse.Result.PAYER_REQUIRED:
        console.log(['The transaction failed because the transaction subsidizer did not sign the transaction.'])
        break
    }
  }
}
