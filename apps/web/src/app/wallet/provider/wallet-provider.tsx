import { AccountBalance, createWallet, Wallet } from '@kin-sdk/client'
import { orderBy } from 'lodash'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

import { useDatabase } from '../../core/data-access/core-injector'
import { useNetwork, usePrices } from '../../network/data-access'
import { WalletAddType, WalletStatus, WalletTransaction } from '../data-access'

const sleep = (seconds = 1) => new Promise((resolve) => setTimeout(resolve, seconds * 1000))
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
  const { network, client } = useNetwork()
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
    return client
      .createAccount(wallet.secret)
      .then(() => sleep(2))
      .then(() => refresh())
      .then(() => reload())
  }

  const sendTransaction = (wallet: Wallet, tx: WalletTransaction): Promise<[string, string?]> => {
    return client?.submitPayment({
      amount: tx.amount,
      destination: tx.destination,
      memo: tx.memo,
      secret: wallet.secret,
      tokenAccount: wallet.publicKey,
    })
  }

  const resolveTokenAccount = (publicKey: string): Promise<[any[], string?]> => {
    return client.resolveTokenAccounts(publicKey)
  }

  const handleAccountRefresh = async (wallet: Wallet): Promise<{ balance?: string; error?: string }> => {
    let balance = '0'
    setAccountStatus((current) => ({ ...current, [wallet.publicKey]: 'Loading' }))
    setAccountError((current) => ({ ...current, [wallet.publicKey]: null }))
    const [balances, error] = await resolveTokenAccount(wallet.publicKey)

    if (error) {
      setAccountError((current) => ({ ...current, [wallet.publicKey]: error }))
      setAccountStatus((current) => ({ ...current, [wallet.publicKey]: 'Error' }))
      return { error: error, balance }
    }

    if (balances?.length) {
      const found = balances.find((item) => item.account === wallet.publicKey)

      if (found) {
        balance = found.balance
      }

      balances.map((res) => {
        setAccountBalance((current) => ({ ...current, [res.account]: convertPrice(res.balance) }))
        setAccountStatus((current) => ({ ...current, [res.account]: 'Active' }))
      })

      setTotalBalance(balances.reduce((acc, cur) => acc + parseInt(cur?.balance, 10), 0))
    }

    return { balance }
  }

  const refresh = async (): Promise<void> => {
    await refreshPrices()
    if (!wallets?.length || !network || !client) {
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
      .then((items) => items.map((item) => ({ ...item, explorerUrl: client?.getExplorerUrl(item?.publicKey) })))
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
    const newWallet = createWallet(type, wallet)
    const created = await db?.wallets?.createItem(newWallet)

    return createAccount(created).then(() => [created && `Wallet Created`, !created && 'Error creating wallet'])
  }

  useEffect(() => {
    setLoading(true)
    if (db?.wallets && client) {
      reload()
    }
  }, [db, client])

  useEffect(() => {
    if (wallets && network && client) {
      refresh()
    }
  }, [wallets, network, client])

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
