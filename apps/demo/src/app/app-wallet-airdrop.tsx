import { KinClient, Wallet } from '@kin-sdk/client'
import React, { useState, VFC } from 'react'

export interface AppWalletRequestAirdropProps {
  client: KinClient
  wallet: Wallet
}

export const AppWalletRequestAirdrop: VFC<AppWalletRequestAirdropProps> = ({ client, wallet }) => {
  const [requestAirdropEnabled, setRequestAirdropEnabled] = useState(true)
  const [requestAirdropStatus, setRequestAirdropStatus] = useState(null)
  const [destination, setDestination] = useState<string>(wallet?.publicKey)
  const [amount, setAmount] = useState<string>('1000')

  const requestAirdrop = async () => {
    setRequestAirdropEnabled(false)
    setRequestAirdropStatus({ status: 'requestAirdrop Started' })
    try {
      const [result, error] = await client.requestAirdrop(wallet.publicKey, amount)
      setRequestAirdropStatus({ result, error })
      setRequestAirdropEnabled(true)
    } catch (error) {
      setRequestAirdropStatus({ error })
      setRequestAirdropEnabled(true)
    }
  }

  return (
    <div>
      <div>
        <input className="form-control" value={destination} onChange={(e) => setDestination(e?.target?.value)} />
      </div>
      <div>
        <input className="form-control" value={amount} onChange={(e) => setAmount(e?.target?.value)} />
      </div>
      <hr />
      <button onClick={requestAirdrop} className="btn btn-sm btn-primary mb-2" disabled={!requestAirdropEnabled}>
        Request Airdrop
      </button>
      <pre>requestAirdrop: {JSON.stringify(requestAirdropStatus, null, 2)}</pre>
    </div>
  )
}
