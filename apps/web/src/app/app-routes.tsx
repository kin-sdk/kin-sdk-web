import React from 'react'
import { Route } from 'react-router-dom'
import { SettingsIndex } from './settings/feature/settings-index'
import { WalletList } from './wallet/feature/wallet-list'

export function AppRoutes() {
  return (
    <>
      <Route path="/" exact render={() => <WalletList />} />
      <Route path="/settings" exact render={() => <SettingsIndex />} />
    </>
  )
}
