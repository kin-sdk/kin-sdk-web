import { BalanceResult, KinWalletService, Wallet } from '@kin-wallet/services'
import { useSnackbar } from 'notistack'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
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
  addWallet?: ([WalletAddType, Wallet]) => Promise<[string, string?]>
}

const WalletContext = createContext<WalletContextProps>(undefined)

function WalletProvider({ children }: { children: ReactNode }) {
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState<boolean>(false)
  const [wallets] = useState(WALLETS)
  const [balance, setBalance] = useState<BalanceResult>(null)
  const { network } = useNetwork()

  const refresh = (): Promise<void> => {
    if (!wallets.length) {
      return Promise.resolve()
    }
    const service = new KinWalletService(network)
    setLoading(() => true)
    setBalance(null)
    return service
      .getBalance(wallets.map((wallet) => wallet.publicKey))
      .then(setBalance)
      .then(() => setLoading(() => false))
      .catch((e) => {
        console.log('error', e)
      })
  }

  const addWallet = async ([type, wallet]: [WalletAddType, Wallet]): Promise<[string, string?]> => {
    console.log('type', type)
    console.log('wallet', wallet)
    return Promise.resolve(['TBD'])
  }

  useEffect(() => {
    enqueueSnackbar(`Selecting network ${network.name}`, { variant: 'info' })
    Promise.resolve().then(() => refresh())
  }, [network])

  return (
    <WalletContext.Provider value={{ wallets, balance, loading, refresh, addWallet }}>
      {children}
    </WalletContext.Provider>
  )
}

const useWallet = () => useContext(WalletContext)

export { WalletProvider, useWallet }
