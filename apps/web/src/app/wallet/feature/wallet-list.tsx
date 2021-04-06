import { Wallet } from '@kin-wallet/services'
import { CircularProgress, Paper, Typography } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { useSnackbar } from 'notistack'
import React, { useEffect } from 'react'
import { useWallet, WalletTransaction } from '../data-access'

import { WalletListHeader, WalletListItem } from '../ui'

export function WalletList() {
  const { enqueueSnackbar } = useSnackbar()
  const { wallets, balance, error, loading, loadingBalance, refresh, deleteWallet } = useWallet()
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

  useEffect(() => {
    if (error) {
      enqueueSnackbar(`${error}`, { variant: 'error' })
    }
  }, [error])

  return (
    <Paper elevation={5}>
      <WalletListHeader balance={balance?.total} loading={loadingBalance} onRefresh={refresh} />
      { error ? <Alert variant='filled' className='m-4' severity="error">{error}</Alert> : null }
      {loading ? (
        <div className="h-36 flex flex-col justify-center items-center">
          <CircularProgress size={60} color="secondary" />
        </div>
      ) : (
        <div className="divide-y divide-gray-800">
          {!wallets?.length ? (
            <div className="h-36 flex flex-col justify-center items-center">
              <Typography variant="h6" className={''}>
                No accounts found.
              </Typography>
            </div>
          ) : (
            wallets?.map((wallet, index) => (
              <WalletListItem
                open={index === 0}
                key={wallet.id}
                wallet={wallet}
                info={balance?.addressMap[wallet.publicKey]}
                handleDelete={deleteWallet}
                handleTransaction={handleTransaction}
              />
            ))
          )}
        </div>
      )}
    </Paper>
  )
}
