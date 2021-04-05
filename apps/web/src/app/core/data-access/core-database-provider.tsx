import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { Database } from './core-database-utils'
import { getWalletDb } from './core-wallet-db'

const DatabaseContext = createContext<[Database<any>, boolean]>(undefined)

function DatabaseProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState<boolean>(false)
  const [walletDb, setWalletDb] = useState<Database<any>>(null)
  useEffect(() => {
    if (!walletDb) {
      setLoading(true)
      getWalletDb()
        .then(setWalletDb)
        .then(() => setLoading(false))
    }
  }, [setWalletDb])

  return <DatabaseContext.Provider value={[walletDb, loading]}>{children}</DatabaseContext.Provider>
}

const useDatabase = () => useContext(DatabaseContext)

export { DatabaseProvider, useDatabase }
