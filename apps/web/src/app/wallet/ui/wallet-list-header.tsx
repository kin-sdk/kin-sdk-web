import { AccountBalance } from '@kin-sdk/client'
import IconButton from '@material-ui/core/IconButton'
import RefreshIcon from '@material-ui/icons/Refresh'
import React from 'react'
import { WalletBalance } from './wallet-balance'

interface UiHeaderCardProps {
  balance?: AccountBalance
  loading?: boolean
  onRefresh: () => void
}

export function WalletListHeader({ loading, balance, onRefresh }: UiHeaderCardProps) {
  return (
    <div className="bg-gray-800 max-w-5xl md:max-w-2xl mx-auto py-1 md:py-3 px-3 md:px-4 h-full">
      <div className="flex justify-between items-center">
        <h2 className="flex-grow font-semibold text-lg">
          <span className="flex space-x-2">
            {loading ? <span>Loading...</span> : <span className="hidden md:inline-block">Balance</span>}
            {!loading ? <WalletBalance balance={balance} inline /> : null}
          </span>
        </h2>
        <div className="flex justify-evenly items-center">
          <IconButton onClick={onRefresh}>
            <RefreshIcon />
          </IconButton>
        </div>
      </div>
    </div>
  )
}
