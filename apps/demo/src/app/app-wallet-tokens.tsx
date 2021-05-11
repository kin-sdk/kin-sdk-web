import { KinClient, Wallet } from '@kin-sdk/client'
import React, { useState, VFC } from 'react'

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
    setResolveAccountEnabled(true)
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
