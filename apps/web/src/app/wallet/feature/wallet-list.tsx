import { Wallet } from '@kin-wallet/services'
import { CircularProgress, Paper } from '@material-ui/core'
import React, { useState } from 'react'
import { WalletAddDialog, WalletAddType } from '../ui/wallet-add-dialog'

import { useWallets } from '../data-access/wallet-hook'
import { WalletListHeader } from '../ui/wallet-list-header'
import { WalletListItem } from '../ui/wallet-list-item'

export function WalletList() {
  const [wallets, balance, loading, refresh] = useWallets()
  const [walletAddType, setWalletAddMode] = useState<WalletAddType>(null)
  const [showAddModal, setShowAddModal] = useState(false)

  const openAddModal = (type: WalletAddType) => {
    setWalletAddMode(type)
    setShowAddModal(true)
  }

  const handleAdd = (wallet?: Wallet) => {
    setShowAddModal(false)
    console.log(wallet)
  }

  return (
    <Paper elevation={5}>
      <div>
        <WalletAddDialog
          name={`Account ${wallets?.length + 1}`}
          type={walletAddType}
          open={showAddModal}
          onClose={handleAdd}
        />
        <WalletListHeader
          title={loading ? 'Loading...' : `Total Balance $${balance?.total?.usd} ₿${balance?.total?.btc}`}
          onAdd={openAddModal}
          onRefresh={refresh}
        />
        {loading ? (
          <div className="h-36 flex flex-col justify-center items-center">
            <CircularProgress size={60} color="secondary" />
          </div>
        ) : (
          <div className="divide-y divide-gray-800">
            {wallets.map((wallet) => (
              <WalletListItem key={wallet.id} wallet={wallet} info={balance.addressMap[wallet.publicKey]} />
            ))}
          </div>
        )}
      </div>
    </Paper>
  )
}
