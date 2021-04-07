import { AccountBalance, BalanceResult, Wallet } from '@kin-wallet/services'
import { orderBy } from 'lodash'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useDatabase } from '../../core/data-access'
import { useNetwork, usePrices } from '../../network/data-access'
import { createWallet } from './create-wallet'
import { WalletAddType } from './interfaces/wallet-add-type'
import { WalletStatus } from './interfaces/wallet-status.type'

export interface WalletContextProps {
  accountBalance?: Record<string, AccountBalance>
  accountStatus?: Record<string, WalletStatus>
  wallets?: Wallet[]
  balance?: BalanceResult
  loading?: boolean
  loadingBalance?: boolean
  error?: string
  totalBalance?: AccountBalance
  refresh?: () => Promise<void>
  reload?: () => Promise<void>
  addWallet?: ([WalletAddType, Wallet]) => Promise<[string, string?]>
  deleteWallet?: (wallet: Wallet) => Promise<boolean>
}

const WalletContext = createContext<WalletContextProps>(undefined)

function WalletProvider({ children }: { children: ReactNode }) {
  const [db, loadingDb] = useDatabase()
  const { network, service } = useNetwork()
  const { convertPrice, refreshPrices, prices } = usePrices()

  const [loading, setLoading] = useState<boolean>(true)
  const [loadingBalance, setLoadingBalance] = useState<boolean>(true)
  const [error, setError] = useState<string>()
  const [wallets, setWallets] = useState(null)
  const [balance, setBalance] = useState<BalanceResult>(null)
  const [totalBalance, setTotalBalance] = useState<AccountBalance>(null)
  const [accountBalance, setAccountBalance] = useState({})
  const [accountStatus, setAccountStatus] = useState({})

  const createAccount = (secret: string) => {
    return service?.client.createAccount(secret).then((res) => {
      console.log('res', res)
      return res
    })
  }

  const resolveTokenAccount = (publicKey: string): Promise<{ balances?: any; error?: string }> | undefined => {
    return service?.client.resolveTokenAccounts(publicKey)
  }

  const handleAccountRefresh = async (wallet: Wallet): Promise<{ balance?: string; error?: string }> => {
    let balance = '0'
    setAccountStatus((current) => ({ ...current, [wallet.publicKey]: 'Loading' }))
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
    setBalance(null)
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
      .then(setWallets)
      .then(() => {
        refresh()
        setLoading(false)
      })
  }

  const deleteWallet = async (wallet: Wallet): Promise<boolean> => {
    const deleted = await db?.wallets?.deleteItem(wallet?.id)
    await reload()
    return !!deleted
  }

  const addWallet = async ([type, wallet]: [WalletAddType, Wallet]): Promise<[string, string?]> => {
    const newWallet = await createWallet(type, wallet)
    const created = await db?.wallets?.createItem(newWallet)

    return Promise.resolve([created && `Wallet Created`, !created && 'Error creating wallet'])
  }

  useEffect(() => {
    setLoading(true)
    if (db?.wallets && !loadingDb) {
      reload()
    }
  }, [db, loadingDb])

  useEffect(() => {
    if (wallets && network && service) {
      refresh()
    }
  }, [wallets, network, service])

  return (
    <WalletContext.Provider
      value={{
        accountBalance,
        accountStatus,
        totalBalance,
        error,
        loading,
        loadingBalance,
        balance,
        wallets,
        refresh,
        reload,
        addWallet,
        deleteWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

const useWallet = () => useContext(WalletContext)

export { WalletProvider, useWallet }
