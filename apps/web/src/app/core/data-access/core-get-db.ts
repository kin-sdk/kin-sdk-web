import { createDatabase } from './core-database-utils'
import * as adapter from 'pouchdb-adapter-idb'

export const getDb = () => createDatabase(adapter, 'idb')
