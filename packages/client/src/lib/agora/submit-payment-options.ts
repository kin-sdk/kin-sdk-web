import { TransactionType } from '@kin-sdk/core'

export interface SubmitPaymentOptions {
  amount: string
  destination: string
  tokenAccount: string
  memo?: string
  type?: TransactionType
  secret: string
}
