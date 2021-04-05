import { Wallet } from '@kin-wallet/sdk'
import * as adapter from 'pouchdb-adapter-idb'
import { RxJsonSchema } from 'rxdb'
import { createDatabase } from './core-database-utils'

export const walletSchema: RxJsonSchema<Wallet> = {
  title: 'Wallet Schema',
  description: 'Describes a wallet',
  version: 0,
  keyCompression: true,
  type: 'object',
  indexes: ['name'],
  properties: {
    id: {
      type: 'string',
      primary: true,
    },
    name: {
      type: 'string',
    },
    publicKey: {
      type: 'string',
    },
    secret: {
      type: 'string',
    },
  },
  required: ['id', 'name', 'publicKey'],
}

export const getWalletDb = () => createDatabase<Wallet>(adapter, 'idb', 'wallets', walletSchema)
