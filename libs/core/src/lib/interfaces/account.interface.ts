export enum KinAccountStatus {
  Unregistered = 'Unregistered',
  Registered = 'Registered',
}

export class KinAccount {
  id: string
  name: string
  publicKey: string
  secret?: string
  tokenAccounts?: string[]
  balance?: BigInteger
  status: KinAccountStatus
}
