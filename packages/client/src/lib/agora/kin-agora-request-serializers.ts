import {
  AccountSize,
  bs58encode,
  Commitment,
  CreateAccountRequest,
  GetAccountInfoRequest,
  GetHistoryRequest,
  GetMinimumBalanceForRentExemptionRequest,
  Keypair,
  kinToQuarks,
  PrivateKey,
  PublicKey,
  RequestAirdropRequest,
  ResolveTokenAccountsRequest,
  SolanaAccount,
  SolanaAccountId,
  SolanaTransaction,
  SubmitTransactionRequest,
  Transaction,
  TransactionType,
} from '@kin-sdk/core'
import { createSolanaTransaction } from './kin-agora-helpers'
import { SubmitPaymentOptions } from './submit-payment-options'

export function serializeCreateAccountRequest(protoTx: Transaction) {
  const createReq = new CreateAccountRequest()
  createReq.setTransaction(protoTx)
  createReq.setCommitment(Commitment.SINGLE)

  return createReq.serializeBinary()
}

export function serializeRequestAirdropRequest(publicKey: string, amount: string) {
  const accountId = new SolanaAccountId()
  accountId.setValue(PublicKey.fromBase58(publicKey).buffer)

  const req = new RequestAirdropRequest()
  req.setAccountId(accountId)
  req.setCommitment(Commitment.SINGLE)
  req.setQuarks(kinToQuarks(amount).toNumber())
  return req.serializeBinary()
}

export function serializeGetTokenAccountBalanceRequest(tokenAccount: SolanaAccountId) {
  const req = new GetAccountInfoRequest()
  req.setAccountId(tokenAccount)
  req.setCommitment(Commitment.SINGLE)

  return req.serializeBinary()
}

export function serializeGetBalanceRequest(publicKey: string) {
  const accountId = new SolanaAccountId()
  accountId.setValue(PublicKey.fromBase58(publicKey).buffer)

  const req = new GetAccountInfoRequest()
  req.setAccountId(accountId)
  req.setCommitment(Commitment.SINGLE)
  return req.serializeBinary()
}

export function serializeGetHistoryRequest(publicKey: string) {
  const accountId = new SolanaAccountId()
  accountId.setValue(PublicKey.fromBase58(publicKey).buffer)

  const req = new GetHistoryRequest()
  req.setAccountId(accountId)
  return req.serializeBinary()
}

export function serializeSubmitTransactionRequest(tx: Transaction) {
  const submitReq = new SubmitTransactionRequest()
  submitReq.setTransaction(tx)
  submitReq.setCommitment(Commitment.SINGLE)
  return submitReq.serializeBinary()
}

export function serializeMinBalanceReq() {
  const minBalanceReq = new GetMinimumBalanceForRentExemptionRequest()
  minBalanceReq.setSize(AccountSize)
  return minBalanceReq.serializeBinary()
}

export function serializeResolveTokenAccountsRequest(publicKey: string) {
  const accountID = new SolanaAccountId()
  accountID.setValue(PublicKey.fromBase58(publicKey.trim()).buffer)
  const req = new ResolveTokenAccountsRequest()
  req.setAccountId(accountID)
  return req.serializeBinary()
}

export function serializeSubmitPaymentTransaction(
  { secret, tokenAccount, destination, amount, memo, type }: SubmitPaymentOptions,
  subsidizer,
  tokenProgram,
  appIndex?: number,
): [PrivateKey, SolanaTransaction] {
  const pk: PrivateKey = PrivateKey.fromSecret(secret)
  const transaction = createSolanaTransaction({
    type: type || TransactionType.P2P,
    publicKey: Keypair.fromSecret(secret).publicKey,
    tokenAccount,
    destination,
    kinAmount: amount,
    memo,
    subsidizer,
    tokenProgram,
    appIndex,
  })

  return [pk, transaction]
}

export function serializeSubmitPaymentRequest(pk, transaction, resp) {
  transaction.recentBlockhash = bs58encode(Buffer.from(resp.getBlockhash()!.getValue_asU8()))
  transaction.partialSign(new SolanaAccount(pk.secretKey()))
  const protoTx = new Transaction()
  protoTx.setValue(
    transaction.serialize({
      requireAllSignatures: false,
      verifySignatures: false,
    }),
  )
  return protoTx
}
