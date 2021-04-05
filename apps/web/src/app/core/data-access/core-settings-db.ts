import { RxJsonSchema } from 'rxdb'
import { Setting } from '../../settings/data-access'

export const settingsSchema: RxJsonSchema<Setting> = {
  title: 'Settings Schema',
  description: 'Describes the app settings',
  version: 0,
  keyCompression: true,
  type: 'object',
  indexes: ['id'],
  properties: {
    id: {
      type: 'string',
      primary: true,
    },
    value: {
      type: 'string',
    },
  },
  required: ['id', 'value'],
}
