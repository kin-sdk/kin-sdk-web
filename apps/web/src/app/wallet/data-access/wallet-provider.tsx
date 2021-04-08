import { AccountBalance, Wallet } from '@kin-sdk/services'
import { orderBy } from 'lodash'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

import { useDatabase } from '../../core/data-access/core-injector'
import { useNetwork, usePrices } from '../../network/data-access'
import { createWallet } from './create-wallet'
import { WalletAddType } from './interfaces/wallet-add-type'
import { WalletStatus } from './interfaces/wallet-status.type'
import { WalletTransaction } from './interfaces/wallet-transaction'

export interface WalletContextProps {
  accountBalance?: Record<string, AccountBalance>
  accountError?: Record<string, string>
  accountStatus?: Record<string, WalletStatus>
  wallets?: Wallet[]
  loading?: boolean
  error?: string
  totalBalance?: AccountBalance
  refresh?: () => Promise<void>
  reload?: () => Promise<void>
  addWallet?: ([WalletAddType, Wallet]) => Promise<[string, string?]>
  createAccount?: (wallet: Wallet) => Promise<void>
  deleteWallet?: (wallet: Wallet) => Promise<void>
  sendTransaction?: (wallet: Wallet, tx: WalletTransaction) => Promise<[string, string?]>
}

const WalletContext = createContext<WalletContextProps>(undefined)

function WalletProvider({ children }: { children: ReactNode }) {
  const db = useDatabase()
  const { network, service } = useNetwork()
  const { convertPrice, refreshPrices } = usePrices()

  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>()
  const [wallets, setWallets] = useState(null)

  const [totalBalance, setTotalBalance] = useState<AccountBalance>(null)
  const [accountBalance, setAccountBalance] = useState({})
  const [accountError, setAccountError] = useState({})
  const [accountStatus, setAccountStatus] = useState({})

  const createAccount = (wallet: Wallet): Promise<void> => {
    setAccountStatus((current) => ({ ...current, [wallet.publicKey]: 'Creating' }))
    setAccountError((current) => ({ ...current, [wallet.publicKey]: undefined }))
    return service?.client
      .createAccount(wallet.secret)
      .then((res) => {
        setAccountStatus((current) => ({ ...current, [wallet.publicKey]: 'Submitted' }))
        return handleAccountRefresh(wallet)
      })
      .then(() => refresh())
      .then(() => reload())
  }

  const sendTransaction = (wallet: Wallet, tx: WalletTransaction): Promise<[string, string?]> => {
    return service?.client?.submitPayment({
      amount: tx.amount,
      destination: tx.destination,
      memo: tx.memo,
      secret: wallet.secret,
      tokenAccount: wallet.publicKey,
    })
  }

  const resolveTokenAccount = (publicKey: string): Promise<{ balances?: any; error?: string }> | undefined => {
    return service?.client.resolveTokenAccounts(publicKey)
  }

  const handleAccountRefresh = async (wallet: Wallet): Promise<{ balance?: string; error?: string }> => {
    let balance = '0'
    setAccountStatus((current) => ({ ...current, [wallet.publicKey]: 'Loading' }))
    setAccountError((current) => ({ ...current, [wallet.publicKey]: null }))
    const ta = await resolveTokenAccount(wallet.publicKey)

    if (ta.balances?.length) {
      const found = ta.balances.find((item) => item.account === wallet.publicKey)

      if (found) {
        balance = found.balance
      }

      ta.balances.map((res) => {
        setAccountBalance((current) => ({ ...current, [res.account]: convertPrice(res.balance) }))
        setAccountStatus((current) => ({ ...current, [res.account]: 'Active' }))
      })

      setTotalBalance(ta.balances.reduce((acc, cur) => acc + parseInt(cur?.balance, 10), 0))
    }

    if (ta.error) {
      setAccountError((current) => ({ ...current, [wallet.publicKey]: ta?.error }))
      setAccountStatus((current) => ({ ...current, [wallet.publicKey]: 'Error' }))
      return { error: ta.error, balance }
    }

    return { balance }
  }

  const refresh = async (): Promise<void> => {
    await refreshPrices()
    if (!wallets?.length || !network || !service) {
      return Promise.resolve()
    }
    setError(null)

    // const status = wallets.reduce((acc, curr) => ({ ...acc, [curr.publicKey]: 'Loading' }), {})
    // setAccountStatus(status)

    const resolved: any[] = await Promise.all(wallets.map(handleAccountRefresh))
    const sum = resolved.reduce((acc: number, curr) => acc + parseInt(curr.balance, 10), 0)
    setTotalBalance(convertPrice(sum))

    return Promise.resolve()
  }

  const reload = async () => {
    setLoading(true)
    return db?.wallets
      ?.findMany()
      .then((items) => orderBy(items, 'name'))
      .then((items) => items.map((item) => ({ ...item, explorerUrl: service?.getExplorerUrl(item?.publicKey) })))
      .then(setWallets)
      .then(() => {
        refresh()
        setLoading(false)
      })
  }

  const deleteWallet = async (wallet: Wallet): Promise<void> => {
    await db?.wallets?.deleteItem(wallet?.id)
    await reload()
  }

  const addWallet = async ([type, wallet]: [WalletAddType, Wallet]): Promise<[string, string?]> => {
    const newWallet = await createWallet(type, wallet)
    const created = await db?.wallets?.createItem(newWallet)

    return Promise.resolve([created && `Wallet Created`, !created && 'Error creating wallet'])
  }

  useEffect(() => {
    setLoading(true)
    if (db?.wallets && service) {
      reload()
    }
  }, [db, service])

  useEffect(() => {
    if (wallets && network && service) {
      refresh()
    }
  }, [wallets, network, service])

  return (
    <WalletContext.Provider
      value={{
        accountBalance,
        accountError,
        accountStatus,
        createAccount,
        totalBalance,
        error,
        loading,
        wallets,
        refresh,
        reload,
        addWallet,
        deleteWallet,
        sendTransaction,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

const useWallet = () => useContext(WalletContext)

export { WalletProvider, useWallet }
