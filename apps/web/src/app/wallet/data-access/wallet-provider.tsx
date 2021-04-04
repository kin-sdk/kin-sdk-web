import { Wallet } from '@kin-wallet/services'
import { BalanceResult, KinWalletService } from '@kin-wallet/services'
import { useSnackbar } from 'notistack'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { ReactNode } from 'react'
import { useNetwork } from '../../network/data-access/network-provider'

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

const WalletContext = createContext<[Wallet[], BalanceResult, boolean, () => Promise<void>]>(undefined)

function WalletProvider({ children }: { children: ReactNode }) {
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState<boolean>(true)
  const [wallets] = useState(WALLETS)
  const [balance, setBalance] = useState<BalanceResult>(null)
  const { network } = useNetwork()

  const refresh = (): Promise<void> => {
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

  useEffect(() => {
    enqueueSnackbar(`Selecting network ${network.name}`, { variant: 'info' })
    Promise.resolve().then(() => refresh())
  }, [network])

  return <WalletContext.Provider value={[wallets, balance, loading, refresh]}>{children}</WalletContext.Provider>
}

const useWallet = () => useContext(WalletContext)

export { WalletProvider, useWallet }
