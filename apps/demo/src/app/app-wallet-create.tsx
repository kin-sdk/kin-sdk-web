import { KinClient, Wallet } from '@kin-sdk/client'
import React, { useState, VFC } from 'react'

export interface AppWalletCreateAccountProps {
  client: KinClient
  wallet: Wallet
}

export const AppWalletCreateAccount: VFC<AppWalletCreateAccountProps> = ({ client, wallet }) => {
  const [createAccountStatus, setCreateAccountStatus] = useState(null)
  const createAccount = async () => {
    setCreateAccountStatus({ status: 'createAccount Started' })
    try {
      const [result, error] = await client.createAccount(wallet.secret)
      setCreateAccountStatus({ result, error })
    } catch (error) {
      setCreateAccountStatus({ error })
    }
  }

  return (
    <div>
      <button onClick={createAccount} className="btn btn-sm btn-primary mb-2">
        Create Account
      </button>
      <pre>createAccount: {JSON.stringify(createAccountStatus, null, 2)}</pre>
    </div>
  )
}
