import { DependencyInjector, makeInjector } from '@mindspace-io/react'
import React, { createContext, FC, useContext } from 'react'
import { Database } from './db'
import { CoreService } from './core-service'

const injector: DependencyInjector = makeInjector([CoreService])

const InjectorContext = createContext<DependencyInjector>(null)

const InjectorProvider: FC = ({ children }) => {
  return <InjectorContext.Provider value={injector}>{children}</InjectorContext.Provider>
}

const useDependencyInjector = () => useContext(InjectorContext)
const useDatabase = (): Database => injector.get(CoreService)

export { useDatabase, useDependencyInjector, InjectorProvider }
