import { BalanceResult, Keypair, Wallet } from '@kin-wallet/services'
import { orderBy } from 'lodash'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useDatabase } from '../../core/data-access'
import { useNetwork } from '../../network/data-access'
import { WalletAddType } from './interfaces/wallet-add-type'

export interface WalletContextProps {
  accountBalance?: Record<string, string>
  accountStatus?: Record<string, string>
  wallets?: Wallet[]
  balance?: BalanceResult
  loading?: boolean
  loadingBalance?: boolean
  error?: string
  totalBalance?: string
  refresh?: () => Promise<void>
  reload?: () => Promise<void>
  addWallet?: ([WalletAddType, Wallet]) => Promise<[string, string?]>
  deleteWallet?: (wallet: Wallet) => Promise<boolean>
}

const WalletContext = createContext<WalletContextProps>(undefined)

export function createWallet(type: 'create' | 'import' | 'watch', wallet: Wallet): Wallet {
  switch (type) {
    case 'watch':
      return {
        name: wallet.name,
        publicKey: wallet.publicKey,
        secret: '',
      }
    case 'import': {
      const keys = Keypair.fromSecret(wallet.secret)
      return {
        name: wallet.name,
        ...keys,
      }
    }
    case 'create': {
      const keys = Keypair.randomKeys()
      return {
        name: wallet.name,
        ...keys,
      }
    }
  }
}

function WalletProvider({ children }: { children: ReactNode }) {
  const [db, loadingDb] = useDatabase()
  const [loading, setLoading] = useState<boolean>(true)
  const [loadingBalance, setLoadingBalance] = useState<boolean>(true)
  const [error, setError] = useState<string>()
  const [wallets, setWallets] = useState(null)
  const [balance, setBalance] = useState<BalanceResult>(null)
  const [totalBalance, setTotalBalance] = useState<string>('0')
  const { network, service } = useNetwork()
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

  const handleAccountRefresh = async (wallet: Wallet) => {
    console.log('Refresh Account')
    const ta = await resolveTokenAccount(wallet.publicKey)
    console.log('Token Account', ta)

    if (ta.balances?.length) {
      console.log('Token Account', ta.balances)
      if (ta.error) {
        setAccountStatus((current) => ({ ...current, [wallet.publicKey]: ta.error }))
      }
      ta.balances.map((res) => {
        setAccountBalance((current) => ({ ...current, [res.account]: res.balance }))
        setAccountStatus((current) => ({ ...current, [res.account]: 'Active' }))
      })

      setTotalBalance(ta.balances.reduce((acc, cur) => acc + parseInt(cur?.balance, 10), 0))
    } else {
      console.log('Creating Account')
      await createAccount(wallet.secret)
    }
  }

  const refresh = async (): Promise<void> => {
    if (!wallets?.length || !network || !service) {
      // console.error(`Can't refresh`, { wallets: wallets?.length, network, service })
      return Promise.resolve()
    }
    // const service = new KinWalletService(network)
    // setLoading(() => true)
    // setLoadingBalance(() => true)
    setBalance(null)
    setError(null)

    const accounts = wallets.reduce((acc, curr) => {
      return { ...acc, [curr.publicKey]: 'Refreshing' }
    })
    console.log('accounts, accounts', accounts)
    // setAccountStatus(() =>
    //
    // )
    const resolved = await Promise.all(wallets.map(handleAccountRefresh))

    console.log(resolved)

    return Promise.resolve()
  }

  const reload = async () => {
    setLoading(true)
    return db?.wallets
      ?.findMany()
      .then((items) => orderBy(items, 'name'))
      .then(setWallets)
      .then(() => {
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
    refresh()
  }, [wallets, network])

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
