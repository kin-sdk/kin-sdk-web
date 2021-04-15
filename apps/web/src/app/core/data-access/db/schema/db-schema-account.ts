import { KinAccount } from '@kin-sdk/client'
import { RxJsonSchema } from 'rxdb'

export const accountSchema: RxJsonSchema<KinAccount> = {
  title: 'Account Schema',
  description: 'Describes an account',
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
    tokenAccounts: {
      type: 'array',
    },
    balance: {
      type: 'number',
    },
    status: {
      type: 'string',
      enum: ['Registered', 'Unregistered'],
      default: 'Unregistered',
    },
  },
  required: ['id', 'name', 'publicKey'],
}
