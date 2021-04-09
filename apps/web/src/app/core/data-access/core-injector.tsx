import { DependencyInjector, makeInjector } from '@mindspace-io/react'
import React, { createContext, FC, useContext } from 'react'
import { CoreService } from './core-service'

const InjectorContext = createContext<DependencyInjector>(null)
const injector: DependencyInjector = makeInjector([CoreService])

const InjectorProvider: FC = ({ children }) => {
  return <InjectorContext.Provider value={injector}>{children}</InjectorContext.Provider>
}

const useDependencyInjector = () => useContext(InjectorContext)
const useDatabase = (): CoreService => injector.get(CoreService)

export { useDatabase, useDependencyInjector, InjectorProvider }
