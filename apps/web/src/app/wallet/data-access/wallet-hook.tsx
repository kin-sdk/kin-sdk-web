import { Wallet } from '@kin-wallet/services'
import { BalanceResult, KinWalletService } from '@kin-wallet/services'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { useNetwork } from '../../network-select/network.hook'

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

export const useWallet = (): [Wallet[], BalanceResult, boolean, () => Promise<void>] => {
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

  return [wallets, balance, loading, refresh]
}
