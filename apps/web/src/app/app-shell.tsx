import React from 'react'
import { Link, Route } from 'react-router-dom'
import { UiCard } from './ui/ui-card'
import { WalletList } from './wallet/wallet-list'
import { BiRefresh, BiMenuAltLeft } from 'react-icons/bi'
import { UiHeaderCard } from './ui/ui-header-card'

export function AppShell() {
  return (
    <>
      <Route
        path="/"
        exact
        render={() => (
          <UiCard>
            <UiHeaderCard
              title="Main account Balances ($27.05)"
              icons={[
                <BiMenuAltLeft className="text-3xl stroke-0 hover:bg-primary-400 rounded-full w-10" />,
                <BiRefresh className="text-3xl stroke-0 hover:bg-primary-400 rounded-full w-10" />,
              ]}
            />
            <WalletList />
          </UiCard>
        )}
      />
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
