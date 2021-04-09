import { KinAccount, Wallet } from '@kin-sdk/client'
import { addRxPlugin, createRxDatabase } from 'rxdb'
import { Setting } from '../../../settings/data-access'
import { Collection } from './core-collection'
import { Database } from './core-database'
import { accountSchema } from './schema/db-schema-account'
import { settingsSchema } from './schema/db-schema-settings'
import { walletSchema } from './schema/db-schema-wallet'

export async function createDatabase(adapter, adapterName): Promise<Database> {
  addRxPlugin(adapter)
  let dbPromise: Database = {}

  const collections = [
    { name: 'accounts', schema: accountSchema },
    { name: 'settings', schema: settingsSchema },
    { name: 'wallets', schema: walletSchema },
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

    dbPromise.accounts = new Collection<KinAccount>(dbPromise.db.accounts)
    dbPromise.settings = new Collection<Setting>(dbPromise.db.settings)
    dbPromise.wallets = new Collection<Wallet>(dbPromise.db.wallets)
    return dbPromise
  }

  if (!dbPromise.db) {
    dbPromise = await create()
  }

  return dbPromise
}
