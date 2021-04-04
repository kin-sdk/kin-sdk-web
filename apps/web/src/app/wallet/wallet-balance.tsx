import { AccountBalance } from '@kin-wallet/services'
import React from 'react'

export function WalletBalance({ balance }: { balance: AccountBalance }) {
  return (
    <div>
      <div className="text-right">
        <span className="font-semibold mr-1">{balance?.kin}</span>
        <span className="font-mono">KIN</span>
      </div>
      <div className="text-right text-gray-400">
        <span className="font-semibold mr-1">{balance?.usd}</span>
        <span className="font-mono">USD</span>
      </div>
    </div>
  )
}
