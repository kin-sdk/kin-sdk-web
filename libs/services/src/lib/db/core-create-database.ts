import { Wallet } from '@kin-wallet/sdk'
import { addRxPlugin, createRxDatabase } from 'rxdb'
import { Setting } from '../../../settings/data-access'
import { settingsSchema } from './schema/db-schema-settings'
import { walletSchema } from './schema/db-schema-wallet'
import { Collection } from './core-collection'
import { Database } from './core-database'

export async function createDatabase(adapter, adapterName): Promise<Database> {
  addRxPlugin(adapter)
  let dbPromise: Database = {}

  const collections = [
    { name: 'wallets', schema: walletSchema },
    { name: 'settings', schema: settingsSchema },
  ]

  const create = async (): Promise<Database> => {
    dbPromise.db = await createRxDatabase({
      name: 'database',
      adapter: adapterName,
    })

    // create collections
    await Promise.all(
      collections.map((colData) => {
        return dbPromise.db.collection(colData)
      }),
    )

    dbPromise.settings = new Collection<Setting>(dbPromise.db.settings)
    dbPromise.wallets = new Collection<Wallet>(dbPromise.db.wallets)
    return dbPromise
  }

  if (!dbPromise.db) {
    dbPromise = await create()
  }

  return dbPromise
}
