import { BalanceResult, Keypair, KinWalletService, Wallet } from '@kin-wallet/services'
import { useSnackbar } from 'notistack'
import { orderBy } from 'lodash'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useDatabase } from '../../core/data-access'
import { useNetwork } from '../../network/data-access'
import { WalletAddType } from './interfaces/wallet-add-type'

const WALLETS: Wallet[] = [
  {
    id: 'w1',
    name: 'Account 1',
    secret: 'x',
    publicKey: 'B33hx7NmZXRiC5Rg2Er7pqdNeKLEm7a7uD8tt9zKG4pk',
  },
  {
    id: 'w2',
    name: 'Account 2',
    publicKey: 'Beee3nJMjQJefHNASZpvGuiPmPD7UWiibKJVJGzc7rcZ',
  },
]

export interface WalletContextProps {
  wallets?: Wallet[]
  balance?: BalanceResult
  loading?: boolean
  refresh?: () => Promise<void>
  reload?: () => Promise<void>
  addWallet?: ([WalletAddType, Wallet]) => Promise<[string, string?]>
  deleteWallet?: (wallet: Wallet) => Promise<boolean>
}

const WalletContext = createContext<WalletContextProps>(undefined)

function WalletProvider({ children }: { children: ReactNode }) {
  const [db, loadingDb] = useDatabase()
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState<boolean>(false)
  const [wallets, setWallets] = useState(null)
  const [balance, setBalance] = useState<BalanceResult>(null)
  const { network } = useNetwork()

  const refresh = (): Promise<void> => {
    if (!wallets?.length) {
      return Promise.resolve()
    }
    const service = new KinWalletService(network)
    setLoading(() => true)
    setBalance(null)
    return service
      .getBalance(wallets?.map((wallet) => wallet.publicKey))
      .then(setBalance)
      .then(() => setLoading(() => false))
      .catch((e) => {
        console.log('error', e)
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

  const reload = async () =>
    db
      ?.items()
      .then((items) => orderBy(items, 'name'))
      .then(setWallets)

  const deleteWallet = async (wallet: Wallet): Promise<boolean> => {
    const deleted = await db.deleteItem(wallet?.id)
    await reload()
    return !!deleted
  }

  const addWallet = async ([type, wallet]: [WalletAddType, Wallet]): Promise<[string, string?]> => {
    const newWallet = await createWallet(type, wallet)
    const created = await db.createItem(newWallet)

    return Promise.resolve([created && `Wallet Created`, !created && 'Error creating wallet'])
  }

  useEffect(() => {
    if (db && !loadingDb) {
      reload().then(() => {
        setLoading(false)
      })
    }
  }, [db, loadingDb])

  useEffect(() => {
    refresh()
  }, [wallets])

  useEffect(() => {
    enqueueSnackbar(`Selected network ${network.name}`, { variant: 'info' })
    refresh()
  }, [network])

  return (
    <WalletContext.Provider value={{ wallets, balance, loading, refresh, reload, addWallet, deleteWallet }}>
      {children}
    </WalletContext.Provider>
  )
}

const useWallet = () => useContext(WalletContext)

export { WalletProvider, useWallet }
