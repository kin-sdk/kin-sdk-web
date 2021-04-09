import { AccountBalance, BalanceResult, Wallet } from '@kin-sdk/client'
import { State } from '@mindspace-io/react'
import { WalletStatusEnum } from './wallet-status.type'
import { WalletTransaction } from './wallet-transaction'

export interface WalletAPI {
  addWallet: ([WalletAddType, Wallet]) => void
  deleteWallet: (wallet: Wallet) => void
  reloadWallets: () => void
  refreshPrices: () => void
  createAccount: (wallet: Wallet) => void
  sendTransaction: (wallet: Wallet, tx: WalletTransaction) => void
}

export interface WalletState extends State {
  wallets: Wallet[]
  selectedWallet: Wallet
  status: WalletStatusEnum

  balance: BalanceResult
  totalBalance: AccountBalance
  accountBalance: Record<string, AccountBalance>
}

export interface WalletStore extends WalletAPI, WalletState {}
