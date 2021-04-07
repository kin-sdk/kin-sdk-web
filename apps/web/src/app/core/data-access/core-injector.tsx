import { DependencyInjector, makeInjector } from '@mindspace-io/react'
import React, { createContext, FC, useContext } from 'react'
import { CoreDatabase } from './core-get-db'
// const TOKEN_DATABASE = new InjectionToken('CoreDatabase')

const injector: DependencyInjector = makeInjector([
  // Can be written as just: CoreDatabase
  { provide: CoreDatabase, useClass: CoreDatabase },
])

const InjectorContext = createContext<DependencyInjector>(null)

const InjectorProvider: FC = ({ children }) => {
  return <InjectorContext.Provider value={injector}>{children}</InjectorContext.Provider>
}

const useDependencyInjector = () => useContext(InjectorContext)

export { useDependencyInjector, InjectorProvider }
