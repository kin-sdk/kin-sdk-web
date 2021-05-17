import { KinClient, KinClientOptions, KinEnvironment, Wallet } from '@kin-sdk/client'
import React, { useEffect, useState, VFC } from 'react'
import { AppWalletRequestAirdrop } from './app-wallet-airdrop'
import { AppWalletCreateAccount } from './app-wallet-create'
import { AppWalletCreatePayment } from './app-wallet-payment'
import { AppWalletGetBalances } from './app-wallet-tokens'
import { KinNetwork } from './kin-utils'

interface AppFooterProps {
  options?: KinClientOptions
  network: KinNetwork
  wallet: Wallet
}

export const AppWallet: VFC<AppFooterProps> = ({ network, options, wallet }) => {
  const [client, setClient] = useState<KinClient>(null)
  const [showSecret, setShowSecret] = useState(false)
  const [getBalancesDone, setGetBalancesDone] = useState(false)

  useEffect(() => {
    if (!client) {
      setClient(() => new KinClient(network, options))
    }
  }, [client, setClient])

  const isTest = network.env === KinEnvironment.Test

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

        <AppWalletGetBalances client={client} wallet={wallet} done={setGetBalancesDone} />
        {isTest && <AppWalletRequestAirdrop client={client} wallet={wallet} />}
        <AppWalletCreatePayment client={client} wallet={wallet} done={setGetBalancesDone} />
      </div>
    </div>
  )
}
