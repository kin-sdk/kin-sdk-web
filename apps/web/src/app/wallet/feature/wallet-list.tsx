import { Wallet } from '@kin-wallet/services'
import { CircularProgress, Paper } from '@material-ui/core'
import React, { useState } from 'react'
import { WalletAddDialog, WalletAddType } from '../ui/wallet-add-dialog'

import { useWallet } from '../data-access/wallet-provider'
import { WalletListHeader } from '../ui/wallet-list-header'
import { WalletListItem } from '../ui/wallet-list-item'
import { WalletTransaction } from '../ui/wallet-transaction-dialog'

export function WalletList() {
  const [wallets, balance, loading, refresh] = useWallet()
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

  const handleTransaction = (wallet: Wallet, transaction: WalletTransaction): Promise<[string, string?]> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (transaction.destination.length < 10) {
          return reject([false, `Destination address too short`])
        }
        return resolve([`Transaction sent.`])
      }, 1000)
    })
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
        <WalletListHeader balance={balance?.total} loading={loading} onAdd={openAddModal} onRefresh={refresh} />
        {loading ? (
          <div className="h-36 flex flex-col justify-center items-center">
            <CircularProgress size={60} color="secondary" />
          </div>
        ) : (
          <div className="divide-y divide-gray-800">
            {wallets.map((wallet) => (
              <WalletListItem
                key={wallet.id}
                wallet={wallet}
                info={balance.addressMap[wallet.publicKey]}
                handleTransaction={handleTransaction}
              />
            ))}
          </div>
        )}
      </div>
    </Paper>
  )
}
