import IconButton from '@material-ui/core/IconButton'
import RefreshIcon from '@material-ui/icons/Refresh'
import React from 'react'
import { WalletAddType } from './wallet-add-dialog'
import { WalletAddDialog } from './wallet-add-dropdown'

interface UiHeaderCardProps {
  title: string
  onAdd: (type: WalletAddType) => void
  onRefresh: () => void
}

export function WalletListHeader({ title, onAdd, onRefresh }: UiHeaderCardProps) {
  return (
    <div className="bg-gray-800 max-w-5xl md:max-w-2xl mx-auto py-1 md:py-3 px-3 md:px-4 h-full">
      <div className="flex justify-between items-center">
        <h2 className="flex-grow font-semibold text-lg">{title}</h2>
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
