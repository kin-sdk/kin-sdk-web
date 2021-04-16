import { DependencyInjector, makeInjector } from '@mindspace-io/react'
import React, { createContext, FC, useContext } from 'react'
import { CoreDatabase } from './core-database'
import { CorePrices } from './core-prices'

const InjectorContext = createContext<DependencyInjector>(null)
const injector: DependencyInjector = makeInjector([CoreDatabase, CorePrices])

const InjectorProvider: FC = ({ children }) => (
  <InjectorContext.Provider value={injector}>{children}</InjectorContext.Provider>
)

const useDependencyInjector = () => useContext(InjectorContext)
const useDatabase = (): CoreDatabase => injector.get(CoreDatabase)
const useCorePrices = (): CorePrices => injector.get(CorePrices)

export { useDatabase, useCorePrices, useDependencyInjector, InjectorProvider }
