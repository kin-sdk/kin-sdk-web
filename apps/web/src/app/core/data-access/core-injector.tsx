import { DependencyInjector, makeInjector } from '@mindspace-io/react'
import React, { createContext, FC, useContext } from 'react'
import { CoreDatabase } from './core-database'

const InjectorContext = createContext<DependencyInjector>(null)
const injector: DependencyInjector = makeInjector([CoreDatabase])

const InjectorProvider: FC = ({ children }) => (
  <InjectorContext.Provider value={injector}>{children}</InjectorContext.Provider>
)

const useDependencyInjector = () => useContext(InjectorContext)
const useDatabase = (): CoreDatabase => injector.get(CoreDatabase)

export { useDatabase, useDependencyInjector, InjectorProvider }
