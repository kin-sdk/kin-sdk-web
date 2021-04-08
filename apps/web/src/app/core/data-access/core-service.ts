import { getPrices, Prices, Wallet } from '@kin-sdk/client'
import { RxDatabase } from 'rxdb'
import { Setting } from '../../settings/data-access'
import { Collection, createDatabase, Database } from './db'

export class CoreService implements Database {
  db: RxDatabase
  settings: Collection<Setting> = new Collection<Setting>(null)
  wallets: Collection<Wallet> = new Collection<Wallet>(null)
  network: Setting
  prices: Prices

  private loadNetwork(): Promise<Setting> {
    return this.settings.findOne('network').then((res) => (this.network = res))
  }

  private loadPrices(): Promise<Prices> {
    return getPrices().then((res) => (this.prices = res))
  }

  load(adapter: any, idb = 'idb'): Promise<boolean> {
    const request$ = createDatabase(adapter, idb)

    return request$
      .then((db) => Object.assign(this, db))
      .then(() => Promise.all([this.loadNetwork(), this.loadPrices()]))
      .then(() => true)
  }
}
