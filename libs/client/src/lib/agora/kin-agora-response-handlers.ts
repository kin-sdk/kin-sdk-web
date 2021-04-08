import { bs58encode, CreateAccountResponse, SubmitTransactionResponse, TransactionError } from '@kin-sdk/core'

export function handleCreateAccountResponse(res: CreateAccountResponse): { result?: any; error?: string } {
  switch (res.getResult()) {
    case CreateAccountResponse.Result.OK:
      return {
        result: `Submitted transaction to create token account ${bs58encode(
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

export function handleSubmitTransactionResponse(res: SubmitTransactionResponse): [string, string?] {
  switch (res.getResult()) {
    case SubmitTransactionResponse.Result.OK:
    case SubmitTransactionResponse.Result.ALREADY_SUBMITTED:
      return ['The transaction is submitted', null]
    case SubmitTransactionResponse.Result.FAILED:
      switch (res.getTransactionError().getReason()) {
        case TransactionError.Reason.UNAUTHORIZED:
          return [null, 'The transaction failed due to a signature error']
        case TransactionError.Reason.BAD_NONCE:
          return [null, 'The transaction failed because of a bad nonce. Please try again.']
        case TransactionError.Reason.INSUFFICIENT_FUNDS:
          return [null, 'The transaction failed because of insufficient funds.']
        case TransactionError.Reason.INVALID_ACCOUNT:
          return [null, 'The transaction failed because of an invalid account. Please check your account values']
        default:
          return [null, 'The transaction failed for an unknown reason']
      }
    case SubmitTransactionResponse.Result.REJECTED:
      return [null, 'The transaction was rejected by the configured webhook']
    case SubmitTransactionResponse.Result.INVOICE_ERROR:
      return [null, 'The transaction was rejected by the configured webhook because of an invoice error.']
    case SubmitTransactionResponse.Result.PAYER_REQUIRED:
      return [null, 'The transaction failed because the transaction subsidizer did not sign the transaction.']
  }
}
