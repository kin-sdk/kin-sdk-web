import React from 'react'
import { Link, Route } from 'react-router-dom'
import { UiCard } from './ui/ui-card'
import { WalletList } from './wallet/wallet-list'

export function AppShell() {
  return (
    <>
      <Route path="/" exact render={() => <WalletList />} />
      <Route
        path="/accounts"
        exact
        render={() => (
          <UiCard>
            <h2 className="text-xl p-4">ACCOUNTS</h2>
            <Link className="ml-4 pb-2" to="/">
              Click here to go back to root page.
            </Link>
          </UiCard>
        )}
      />
    </>
  )
}
