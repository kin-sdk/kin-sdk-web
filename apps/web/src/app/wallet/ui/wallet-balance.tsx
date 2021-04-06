import { Prices } from '@kin-wallet/services'
import cx from 'classnames'
import React from 'react'

export function WalletBalance({ balance, inline, prices }: { balance: string; inline?: boolean; prices?: Prices }) {
  return (
    <div className={cx('flex', { 'flex-col': !inline, 'space-x-2': inline })}>
      {balance && prices && (
        <div className={cx('flex', { 'flex-col': !inline, 'space-x-2': inline })}>
          <div className="text-right">
            <span className="font-semibold mr-1">{balance || '- '}</span>
            <span className="font-mono">KIN</span>
          </div>
          <div className="text-right text-gray-400">
            <span className="font-semibold mr-1">{prices?.kin?.usd * parseInt(balance, 10) ?? '- '}</span>
            <span className="font-mono">USD</span>
          </div>
        </div>
      )}
    </div>
  )
}
