import { Wallet } from '@kin-wallet/sdk'
import { addRxPlugin, createRxDatabase, RxCollection, RxDatabase } from 'rxdb'
import { Setting } from '../../settings/data-access'
import { settingsSchema } from './core-settings-db'
import { walletSchema } from './core-wallet-db'

const generateId = (size = 8) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')

export interface Database {
  db?: RxDatabase
  wallets?: Collection<Wallet>
  settings?: Collection<Setting>
}

export class Collection<T> {
  constructor(private readonly collection: RxCollection) {}

  createItem(data: Partial<T>): Promise<T> {
    const id = (data as any).id || generateId()
    return this.collection.insert({ ...data, id }).then((res) => this.findOne(res.id))
  }

  deleteItem(itemId: string): Promise<boolean> {
    return this.collection
      ?.findOne({ selector: { id: itemId } })
      .remove()
      .then((res) => !!res)
  }

  findMany(): Promise<T[]> {
    return this.collection?.find().exec()
  }

  findOne(itemId: string): Promise<T> {
    return this.collection
      ?.findOne({ selector: { id: itemId } })
      .exec()
      .then((res) => res?.toJSON())
  }

  updateItem(id: string, data: Partial<T>): Promise<T> {
    return this.collection.upsert({ ...data, id }).then((res) => this.findOne(res.id))
  }
}

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

    // write to window for debugging
    // window['db'] = dbPromise.db

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
