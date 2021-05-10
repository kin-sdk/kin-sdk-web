import { KinClient, KinProd, Wallet } from '@kin-sdk/client'
import React, { useEffect, useState, VFC } from 'react'
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

        {createAccountDone && <AppWalletResolveAccount client={client} wallet={wallet} done={setResolveAccountDone} />}
        {resolveAccountDone && 'CREATE PAYMENT'}
      </div>
    </div>
  )
}

export interface AppWalletCreateAccountProps {
  done: (done: boolean) => void
  client: KinClient
  wallet: Wallet
}

export const AppWalletCreateAccount: VFC<AppWalletCreateAccountProps> = ({ client, done, wallet }) => {
  const [createAccountEnabled, setCreateAccountEnabled] = useState(true)
  const [createAccountStatus, setCreateAccountStatus] = useState(null)
  const createAccount = async () => {
    setCreateAccountEnabled(false)
    setCreateAccountStatus({ status: 'createAccount Started' })
    const [result, error] = await client.createAccount(wallet.secret)
    setCreateAccountStatus({ result, error })
    if (error) {
      setCreateAccountEnabled(true)
    }
    done(!!result)
  }

  return (
    <div>
      <button onClick={createAccount} className="btn btn-sm btn-primary mb-2" disabled={!createAccountEnabled}>
        Create Account
      </button>
      <pre>createAccountStatus: {JSON.stringify(createAccountStatus, null, 2)}</pre>
    </div>
  )
}

export interface AppWalletResolveAccountProps {
  done: (done: boolean) => void
  client: KinClient
  wallet: Wallet
}

export const AppWalletResolveAccount: VFC<AppWalletResolveAccountProps> = ({ client, done, wallet }) => {
  const [resolveAccountEnabled, setResolveAccountEnabled] = useState(true)
  const [resolveAccountStatus, setResolveAccountStatus] = useState(null)
  const resolveAccount = async () => {
    setResolveAccountEnabled(false)
    setResolveAccountStatus({ status: 'resolveAccount Started' })
    const [result, error] = await client.resolveTokenAccounts(wallet.publicKey)
    setResolveAccountStatus({ result, error })
    if (error) {
      setResolveAccountEnabled(true)
    }
    done(!!result)
  }

  return (
    <div>
      <button onClick={resolveAccount} className="btn btn-sm btn-primary mb-2" disabled={!resolveAccountEnabled}>
        Resolve Account
      </button>
      <pre>resolveAccountStatus: {JSON.stringify(resolveAccountStatus, null, 2)}</pre>
    </div>
  )
}
