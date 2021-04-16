import * as adapter from 'pouchdb-adapter-idb'
import React, { FC, useEffect, useState } from 'react'
import { CoreDatabase, CorePrices, useDependencyInjector } from './core/data-access'
import { NetworkProvider, PricesProvider } from './network/data-access'
import { SettingsProvider } from './settings/data-access'
import { WalletProvider } from './wallet/provider'

export const AppGuard: FC = ({ children }) => {
  const [isReady, setIsReady] = useState<boolean>(false)
  const injector = useDependencyInjector()

  useEffect(() => {
    const db: CoreDatabase = injector.get(CoreDatabase)
    const prices: CorePrices = injector.get(CorePrices)

    db.load(adapter)
      .then(() => prices.load())
      .then(setIsReady)
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
