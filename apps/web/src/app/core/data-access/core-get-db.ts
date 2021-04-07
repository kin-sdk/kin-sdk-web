import { Wallet } from '@kin-wallet/sdk'
import { RxDatabase } from 'rxdb'
import { Setting } from '../../settings/data-access'
import { Collection, createDatabase, Database } from './core-database-utils'
import * as adapter from 'pouchdb-adapter-idb'

export class CoreDatabase implements Database {
  db: RxDatabase
  settings: Collection<Setting> = new Collection<Setting>(null)
  wallets: Collection<Wallet> = new Collection<Wallet>(null)
  network: Setting

  private loadNetwork(): Promise<Setting> {
    return this.settings.findOne('network').then((res) => (this.network = res))
  }

  load(): Promise<boolean> {
    console.log('CoreDatabase Loading')
    const request$ = createDatabase(adapter, 'idb')

    return request$
      .then((db) => Object.assign(this, db))
      .then(() => this.loadNetwork())
      .then(() => console.log('CoreDatabase Loaded'))
      .then(() => true)
  }
}
