import { DependencyInjector, InjectionToken, makeInjector } from '@mindspace-io/react'

import { Wallet } from '@kin-sdk/client'
import { WalletFacade } from '../../wallet/data-access/wallet.facade'
import { makeWalletStore, TOKEN_WALLET_STORE } from '../../wallet/data-access/wallet.store'
import { Collection } from './db'

export const TOKEN_WALLET_COLLECTION = new InjectionToken('Collection<Wallet>')

export const injector: DependencyInjector = makeInjector([
  { provide: TOKEN_WALLET_COLLECTION, useFactory: () => new Collection<Wallet>(null) },
  { provide: WalletFacade, deps: [TOKEN_WALLET_COLLECTION] },
  { provide: TOKEN_WALLET_STORE, useFactory: (facade: WalletFacade) => makeWalletStore(facade), deps: [WalletFacade] },
])
