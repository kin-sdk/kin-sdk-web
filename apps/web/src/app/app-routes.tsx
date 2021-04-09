import React from 'react'
import { Route } from 'react-router-dom'
import { DevIndex } from './dev/feature/dev-index'
import { SettingsIndex } from './settings/feature/settings-index'
import { WalletList } from './wallet/feature/wallet-list'

export function AppRoutes() {
  return (
    <>
      <Route path="/" exact render={() => <WalletList />} />
      <Route path="/dev" render={() => <DevIndex />} />
      <Route path="/settings" exact render={() => <SettingsIndex />} />
    </>
  )
}
