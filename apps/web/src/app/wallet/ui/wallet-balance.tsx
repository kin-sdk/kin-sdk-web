import { AccountBalance } from '@kin-wallet/services'
import cx from 'classnames'
import React from 'react'

export function WalletBalance({ balance, inline }: { balance: AccountBalance; inline?: boolean }) {
  return (
    <div className={cx('flex', { 'flex-col': !inline, 'space-x-2': inline })}>
      {balance?.kin && (
        <div className={cx('flex', { 'flex-col': !inline, 'space-x-2': inline })}>
          <div className="text-right">
            <span className="font-semibold mr-1">{balance?.kin || '- '}</span>
            <span className="font-mono">KIN</span>
          </div>
          <div className="text-right text-gray-400">
            <span className="font-semibold mr-1">{balance?.usd || '- '}</span>
            <span className="font-mono">USD</span>
          </div>
        </div>
      )}
    </div>
  )
}
