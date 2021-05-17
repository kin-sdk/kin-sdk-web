import { KinClient, Wallet } from '@kin-sdk/client'
import React, { useState, VFC } from 'react'

export interface AppWalletGetBalancesProps {
  done: (done: boolean) => void
  client: KinClient
  wallet: Wallet
}

export const AppWalletGetBalances: VFC<AppWalletGetBalancesProps> = ({ client, done, wallet }) => {
  const [getBalancesEnabled, setGetBalancesEnabled] = useState(true)
  const [getBalancesStatus, setGetBalancesStatus] = useState(null)
  const getBalances = async () => {
    setGetBalancesEnabled(false)
    setGetBalancesStatus({ status: 'getBalances Started' })
    const [result, error] = await client.getBalances(wallet.publicKey)
    setGetBalancesStatus({ result, error })
    setGetBalancesEnabled(true)
    done(!!result)
  }

  return (
    <div>
      <button onClick={getBalances} className="btn btn-sm btn-primary mb-2" disabled={!getBalancesEnabled}>
        Get Balances
      </button>
      <pre>getBalances: {JSON.stringify(getBalancesStatus, null, 2)}</pre>
    </div>
  )
}
