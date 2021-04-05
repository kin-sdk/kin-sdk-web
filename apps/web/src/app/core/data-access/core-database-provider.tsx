import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { Database } from './core-database-utils'
import { getDb } from './core-get-db'

const DatabaseContext = createContext<[Database, boolean]>(undefined)

function DatabaseProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState<boolean>(false)
  const [db, setDb] = useState<Database>(null)

  useEffect(() => {
    if (!db) {
      setLoading(true)
      getDb()
        .then(setDb)
        .then(() => setLoading(false))
    }
  }, [db, setDb])

  return <DatabaseContext.Provider value={[db, loading]}>{children}</DatabaseContext.Provider>
}

const useDatabase = () => useContext(DatabaseContext)

export { DatabaseProvider, useDatabase }
