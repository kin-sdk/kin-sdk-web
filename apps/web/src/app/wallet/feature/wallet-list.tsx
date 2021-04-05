import { Wallet } from '@kin-wallet/services'
import { CircularProgress, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { useWallet, WalletTransaction } from '../data-access'

import { WalletListHeader, WalletListItem } from '../ui'

export function WalletList() {
  const { wallets, balance, loading, refresh } = useWallet()

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
      <WalletListHeader balance={balance?.total} loading={loading} onRefresh={refresh} />
      {loading ? (
        <div className="h-36 flex flex-col justify-center items-center">
          <CircularProgress size={60} color="secondary" />
        </div>
      ) : (
        <div className="divide-y divide-gray-800">
          {!wallets.length ? (
            <div className="h-36 flex flex-col justify-center items-center">
              <Typography variant="h6" className={''}>
                No accounts found.
              </Typography>
            </div>
          ) : (
            wallets.map((wallet, index) => (
              <WalletListItem
                open={index === 0}
                key={wallet.id}
                wallet={wallet}
                info={balance?.addressMap[wallet.publicKey]}
                handleTransaction={handleTransaction}
              />
            ))
          )}
        </div>
      )}
    </Paper>
  )
}
