import {
  AccountSize,
  Commitment,
  CreateAccountRequest,
  GetAccountInfoRequest,
  GetMinimumBalanceForRentExemptionRequest,
  PublicKey,
  SolanaAccountId,
  SubmitTransactionRequest,
  Transaction,
} from '@kin-sdk/core'

export function serializeCreateAccountRequest(protoTx: Transaction) {
  const createReq = new CreateAccountRequest()
  createReq.setTransaction(protoTx)
  createReq.setCommitment(Commitment.SINGLE)

  return createReq.serializeBinary()
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

export function serializeSubmitTransactionRequest(tx: Transaction) {
  const submitReq = new SubmitTransactionRequest()
  submitReq.setTransaction(tx)
  submitReq.setCommitment(Commitment.SINGLE)
  return submitReq.serializeBinary()
}

export function serializeGetRecentBlockHash() {
  const minBalanceReq = new GetMinimumBalanceForRentExemptionRequest()
  minBalanceReq.setSize(AccountSize)
  return minBalanceReq.serializeBinary()
}
