import { KinClient, Wallet } from '@kin-sdk/client'
import React, { useState, VFC } from 'react'

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
    try {
      const [result, error] = await client.createAccount(wallet.secret)
      setCreateAccountStatus({ result, error })
      if (error) {
        setCreateAccountEnabled(true)
      }
      done(!!result)
    } catch (error) {
      setCreateAccountStatus({ error })
      setCreateAccountEnabled(true)
    }
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
