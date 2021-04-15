import React, { FC, useEffect, useState } from 'react'
import { CoreDatabase } from './core/data-access/core-database'
import { useDependencyInjector } from './core/data-access/core-injector'
import { NetworkProvider, PricesProvider } from './network/data-access'
import { SettingsProvider } from './settings/data-access'
import { WalletProvider } from './wallet/provider'
import * as adapter from 'pouchdb-adapter-idb'

export const AppGuard: FC = ({ children }) => {
  const [isReady, setIsReady] = useState<boolean>(false)
  const injector = useDependencyInjector()

  useEffect(() => {
    const db: CoreDatabase = injector.get(CoreDatabase)
    db.load(adapter).then(setIsReady)
  }, [injector])

  return isReady ? (
    <SettingsProvider>
      <NetworkProvider>
        <PricesProvider>
          <WalletProvider>{children}</WalletProvider>
        </PricesProvider>
      </NetworkProvider>
    </SettingsProvider>
  ) : null
}
