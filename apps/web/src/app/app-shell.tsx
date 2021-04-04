import { Paper, Typography } from '@material-ui/core'
import React from 'react'
import { Link, Route } from 'react-router-dom'
import { WalletList } from './wallet/feature/wallet-list'

export function AppShell() {
  return (
    <>
      <Route path="/" exact render={() => <WalletList />} />
      <Route
        path="/settings"
        exact
        render={() => (
          <Paper elevation={5}>
            <div className="p-4">
              <Typography variant="h4">Settings</Typography>
              <Link className="ml-4 pb-2" to="/">
                Back to Wallet.
              </Link>
            </div>
          </Paper>
        )}
      />
    </>
  )
}
