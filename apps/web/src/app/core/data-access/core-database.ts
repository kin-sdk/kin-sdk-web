import { Wallet } from '@kin-sdk/client'
import { RxDatabase } from 'rxdb'
import { Setting } from '../../settings/data-access'
import { Collection, createDatabase, Database } from './db'

export class CoreDatabase implements Database {
  db: RxDatabase
  settings: Collection<Setting> = new Collection<Setting>(null)
  wallets: Collection<Wallet> = new Collection<Wallet>(null)

  load(adapter: any, idb = 'idb'): Promise<boolean> {
    const request$ = createDatabase(adapter, idb)

    return request$.then((db) => Object.assign(this, db)).then(() => true)
  }
}