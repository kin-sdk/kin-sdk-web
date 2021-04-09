import { Wallet } from '@kin-sdk/core'
import { DependencyInjector, InjectionToken, makeInjector } from '@mindspace-io/react'
import React, { createContext, FC, useContext } from 'react'
import { WalletStore } from '../../wallet/data-access/interfaces/wallet.store'
import { WalletFacade } from '../../wallet/data-access/wallet.facade'
import { makeWalletStore, TOKEN_WALLET_STORE } from '../../wallet/data-access/wallet.store'
import { CoreService } from './core-service'
import { Collection } from './db'

export const TOKEN_WALLET_COLLECTION = new InjectionToken('Collection<Wallet>')

const InjectorContext = createContext<DependencyInjector>(null)
const injector: DependencyInjector = makeInjector([
  CoreService,
  { provide: TOKEN_WALLET_COLLECTION, useFactory: () => new Collection<Wallet>(null) },
  { provide: WalletFacade, deps: [TOKEN_WALLET_COLLECTION] },
  { provide: TOKEN_WALLET_STORE, useFactory: (facade: WalletFacade) => makeWalletStore(facade), deps: [WalletFacade] },
])

const InjectorProvider: FC = ({ children }) => {
  return <InjectorContext.Provider value={injector}>{children}</InjectorContext.Provider>
}

const useDependencyInjector = () => useContext(InjectorContext)
const useDatabase = (): CoreService => injector.get(CoreService)
const useWalletStore = (): WalletStore => injector.get(TOKEN_WALLET_STORE)

export { useDatabase, useDependencyInjector, InjectorProvider, useWalletStore }
