import { KinEnvironment } from '../kin-environment'

export interface Network {
  id?: string
  env?: KinEnvironment
  name?: string
  explorerUrl?: string
  url?: string
}
