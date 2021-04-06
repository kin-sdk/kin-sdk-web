import { BalanceResult, Keypair, KinWalletService, Wallet } from '@kin-wallet/services'
import { orderBy } from 'lodash'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useDatabase } from '../../core/data-access'
import { useNetwork } from '../../network/data-access'
import { WalletAddType } from './interfaces/wallet-add-type'

export interface WalletContextProps {
  wallets?: Wallet[]
  balance?: BalanceResult
  loading?: boolean
  loadingBalance?: boolean
  error?: string
  refresh?: () => Promise<void>
  reload?: () => Promise<void>
  addWallet?: ([WalletAddType, Wallet]) => Promise<[string, string?]>
  deleteWallet?: (wallet: Wallet) => Promise<boolean>
}

const WalletContext = createContext<WalletContextProps>(undefined)

function WalletProvider({ children }: { children: ReactNode }) {
  const [db, loadingDb] = useDatabase()
  const [loading, setLoading] = useState<boolean>(true)
  const [loadingBalance, setLoadingBalance] = useState<boolean>(true)
  const [error, setError] = useState<string>()
  const [wallets, setWallets] = useState(null)
  const [balance, setBalance] = useState<BalanceResult>(null)
  const { network } = useNetwork()

  const refresh = (): Promise<void> => {
    if (!wallets?.length || !network) {
      return Promise.resolve()
    }
    const service = new KinWalletService(network)
    // setLoading(() => true)
    setLoadingBalance(() => true)
    setBalance(null)
    setError(null)
    return service
      .getBalance(wallets?.map((wallet) => wallet.publicKey))
      .then(setBalance)
      .then(() => setLoadingBalance(() => false))
      .catch((e) => {
        console.log('An error occurred', e?.message)
        setError(e?.message)
        setLoadingBalance(() => false)
      })
  }

  async function createWallet(type: 'create' | 'import' | 'watch', wallet: Wallet): Promise<Wallet> {
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
      value={{ wallets, balance, error, loading, loadingBalance, refresh, reload, addWallet, deleteWallet }}
    >
      {children}
    </WalletContext.Provider>
  )
}

const useWallet = () => useContext(WalletContext)

export { WalletProvider, useWallet }
