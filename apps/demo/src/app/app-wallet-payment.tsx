import { KinClient, Wallet } from '@kin-sdk/client'
import React, { useState, VFC } from 'react'

export interface AppWalletCreatePaymentProps {
  done: (done: boolean) => void
  client: KinClient
  wallet: Wallet
}

export const AppWalletCreatePayment: VFC<AppWalletCreatePaymentProps> = ({ client, done, wallet }) => {
  const [createPaymentEnabled, setCreatePaymentEnabled] = useState(true)
  const [createPaymentStatus, setCreatePaymentStatus] = useState(null)
  const [destination, setDestination] = useState('Don8L4DTVrUrRAcVTsFoCRqei5Mokde3CV3K9Ut4nAGZ')
  const [amount, setAmount] = useState<string>('1000')

  const createPayment = async () => {
    setCreatePaymentEnabled(false)
    setCreatePaymentStatus({ status: 'createPayment Started' })
    try {
      const [result, error] = await client.submitPayment({
        secret: wallet.secret,
        tokenAccount: wallet.publicKey,
        destination,
        amount,
      })
      setCreatePaymentStatus({ result, error })
      setCreatePaymentEnabled(true)
      done(!!result)
    } catch (error) {
      setCreatePaymentStatus({ error })
      setCreatePaymentEnabled(true)
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
      <button onClick={createPayment} className="btn btn-sm btn-primary mb-2" disabled={!createPaymentEnabled}>
        Create Payment
      </button>
      <pre>createPayment: {JSON.stringify(createPaymentStatus, null, 2)}</pre>
    </div>
  )
}
