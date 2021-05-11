import { KinClient, Wallet } from '@kin-sdk/client'
import React, { useEffect, useState, VFC } from 'react'
import { AppWalletCreateAccount } from './app-wallet-create'
import { AppWalletCreatePayment } from './app-wallet-payment'
import { AppWalletResolveAccount } from './app-wallet-tokens'
import { KinNetwork } from './kin-utils'

interface AppFooterProps {
  network: KinNetwork
  wallet: Wallet
}

export const AppWallet: VFC<AppFooterProps> = ({ network, wallet }) => {
  const [client, setClient] = useState<KinClient>(null)
  const [createAccountDone, setCreateAccountDone] = useState(false)
  const [resolveAccountDone, setResolveAccountDone] = useState(false)

  useEffect(() => {
    if (!client) {
      setClient(() => new KinClient(network))
    }
  }, [client, setClient])

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="my-2 p-0">Network: {network?.name}</h3>
        <h5 className="my-2 p-0">Public Key: {wallet?.publicKey}</h5>
      </div>
      <div className="card-body">
        <AppWalletCreateAccount client={client} wallet={wallet} done={setCreateAccountDone} />

        <AppWalletResolveAccount client={client} wallet={wallet} done={setResolveAccountDone} />
        {resolveAccountDone && <AppWalletCreatePayment client={client} wallet={wallet} done={setResolveAccountDone} />}
      </div>
    </div>
  )
}
