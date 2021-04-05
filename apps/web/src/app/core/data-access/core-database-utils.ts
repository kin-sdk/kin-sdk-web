import { addRxPlugin, createRxDatabase, RxDatabase } from 'rxdb'

export interface Database<T> {
  db: RxDatabase
  items: () => Promise<T[]>
  createItem: (data: Partial<T>) => Promise<T>
  deleteItem: (itemId: string) => Promise<boolean>
  item: (itemId: string) => Promise<T>
}

const generateId = (size = 8) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')

export async function createDatabase<T>(adapter, adapterName, name, schema): Promise<Database<T>> {
  addRxPlugin(adapter)
  let dbPromise: Database<T> = null
  const collections = [{ name, schema }]

  const _create = async (): Promise<Database<T>> => {
    console.log('DatabaseService: creating database..')
    const db = await createRxDatabase({
      name: 'database',
      adapter: adapterName,
    })
    console.log('DatabaseService: created database')
    window['db'] = db // write to window for debugging

    // create collections
    console.log('DatabaseService: create collections')
    await Promise.all(collections.map((colData) => db.collection(colData)))

    const createItem = (data: Partial<T>): Promise<T> => {
      const id = (data as any).id || generateId()
      return db.wallets.insert({ ...data, id }).then((res) => item(res.id))
    }

    const deleteItem = (itemId: string): Promise<boolean> => {
      return db?.wallets
        ?.findOne({ selector: { id: itemId } })
        .remove()
        .then((res) => !!res)
    }

    const item = (itemId: string): Promise<T> => {
      return db?.wallets
        ?.findOne({ selector: { id: itemId } })
        .exec()
        .then((res) => res?.toJSON())
    }

    const items = (): Promise<T[]> => {
      return db?.wallets?.find().exec()
    }

    return { db, createItem, deleteItem, item, items }
  }

  if (!dbPromise) {
    dbPromise = await _create()
  }

  return dbPromise
}
