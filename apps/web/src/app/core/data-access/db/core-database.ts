import { KinAccount, Wallet } from '@kin-sdk/client'
import { RxDatabase } from 'rxdb'

import { Collection } from './core-collection'
import { Setting } from '../../../settings/data-access'

export interface Database {
  db?: RxDatabase
  accounts?: Collection<KinAccount>
  settings?: Collection<Setting>
  wallets?: Collection<Wallet>
}
