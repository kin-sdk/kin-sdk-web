import { Wallet } from '@kin-sdk/client'
import { RxJsonSchema } from 'rxdb'

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
