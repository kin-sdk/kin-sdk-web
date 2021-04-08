import { Wallet } from '@kin-wallet/services'
import { CircularProgress, Paper, Typography } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { useSnackbar } from 'notistack'
import React, { useEffect } from 'react'
import { useWallet, WalletTransaction } from '../data-access'

import { WalletListHeader, WalletListItem } from '../ui'

export function WalletList() {
  const { enqueueSnackbar } = useSnackbar()
  const {
    wallets,
    accountBalance,
    accountError,
    accountStatus,
    totalBalance,
    createAccount,
    sendTransaction,
    error,
    loading,
    refresh,
    deleteWallet,
  } = useWallet()

  const handleTransaction = (wallet: Wallet, tx: WalletTransaction): Promise<[string, string?]> => {
    return new Promise((resolve, reject) => {
      if (tx.destination.length < 10) {
        return reject([false, `Destination address too short`])
      }
      return sendTransaction(wallet, tx).then((res) => {
        setTimeout(() => refresh(), 2000)
        return resolve(res)
      })
    })
  }

  useEffect(() => {
    if (error) {
      enqueueSnackbar(`${error}`, { variant: 'error' })
    }
  }, [error])

  return (
    <Paper elevation={5}>
      <WalletListHeader
        balance={totalBalance}
        loading={loading}
        onRefresh={() => {
          refresh().then()
        }}
      />
      {error ? (
        <Alert variant="filled" className="m-4" severity="error">
          {error}
        </Alert>
      ) : null}
      {loading ? (
        <div className="h-36 flex flex-col justify-center items-center">
          <CircularProgress size={60} />
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
                key={wallet.id}
                wallet={wallet}
                balance={accountBalance[wallet.publicKey]}
                open={!!accountError[wallet.publicKey]}
                error={accountError[wallet.publicKey]}
                status={accountStatus[wallet.publicKey]}
                handleDelete={deleteWallet}
                createAccount={createAccount}
                handleTransaction={handleTransaction}
              />
            ))
          )}
        </div>
      )}
      {/*<pre>{JSON.stringify(wallets, null, 2)}</pre>*/}
      {/*<pre>{JSON.stringify(accountStatus, null, 2)}</pre>*/}
    </Paper>
  )
}
