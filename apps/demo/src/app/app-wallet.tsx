import { KinClient, KinClientOptions, Wallet } from '@kin-sdk/client'
import React, { useEffect, useState, VFC } from 'react'
import { AppWalletCreateAccount } from './app-wallet-create'
import { AppWalletCreatePayment } from './app-wallet-payment'
import { AppWalletResolveAccount } from './app-wallet-tokens'
import { KinNetwork } from './kin-utils'

interface AppFooterProps {
  options?: KinClientOptions
  network: KinNetwork
  wallet: Wallet
}

export const AppWallet: VFC<AppFooterProps> = ({ network, options, wallet }) => {
  const [client, setClient] = useState<KinClient>(null)
  const [showSecret, setShowSecret] = useState(false)
  const [resolveAccountDone, setResolveAccountDone] = useState(false)

  useEffect(() => {
    if (!client) {
      setClient(() => new KinClient(network, options))
    }
  }, [client, setClient])

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="my-2 p-0">Network: {network?.name}</h3>
        <h5 className="my-2 p-0">Public Key: {wallet?.publicKey}</h5>
        {showSecret ? (
          <h5 className="my-2 p-0">Secret: {wallet?.secret}</h5>
        ) : (
          <button onClick={() => setShowSecret(true)} className="btn btn-secondary">
            Show Secret
          </button>
        )}
      </div>
      <div className="card-body">
        <AppWalletCreateAccount client={client} wallet={wallet} />

        <AppWalletResolveAccount client={client} wallet={wallet} done={setResolveAccountDone} />
        {resolveAccountDone && <AppWalletCreatePayment client={client} wallet={wallet} done={setResolveAccountDone} />}
      </div>
    </div>
  )
}
