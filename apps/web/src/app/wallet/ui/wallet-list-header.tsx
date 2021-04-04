import { AccountBalance } from '@kin-wallet/services'
import IconButton from '@material-ui/core/IconButton'
import RefreshIcon from '@material-ui/icons/Refresh'
import React from 'react'
import { WalletAddType } from './wallet-add-dialog'
import { WalletAddDialog } from './wallet-add-dropdown'
import { WalletBalance } from './wallet-balance'

interface UiHeaderCardProps {
  loading?: boolean
  balance?: AccountBalance
  onAdd: (type: WalletAddType) => void
  onRefresh: () => void
}

export function WalletListHeader({ loading, balance, onAdd, onRefresh }: UiHeaderCardProps) {
  return (
    <div className="bg-gray-800 max-w-5xl md:max-w-2xl mx-auto py-1 md:py-3 px-3 md:px-4 h-full">
      <div className="flex justify-between items-center">
        <h2 className="flex-grow font-semibold text-lg">
          <span className="flex space-x-2">
            <span>{loading ? 'Loading...' : `Balance`}</span>
            <WalletBalance balance={balance} inline />
          </span>
        </h2>
        <div className="flex justify-evenly items-center">
          <WalletAddDialog onSelect={onAdd} />
          <IconButton onClick={onRefresh}>
            <RefreshIcon />
          </IconButton>
        </div>
      </div>
    </div>
  )
}
