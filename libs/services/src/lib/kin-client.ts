import { KinEnvironment } from '@kin-wallet/sdk'

export interface KinClientTransaction {
  destination: string
  amount: string
  memo?: string
}

export class KinClient {
  constructor(private readonly env: KinEnvironment) {
    console.log(`KinClient: environment: ${env}`)
  }

  createAccount(secret: string): Promise<boolean> {
    console.log(`createAccount ${secret}`)
    return Promise.resolve(true)
  }

  getBalance(publicKey: string): Promise<boolean> {
    console.log(`getBalance ${publicKey}`)
    return Promise.resolve(true)
  }

  submitTransaction(secret: string, tx: KinClientTransaction): Promise<boolean> {
    console.log(`submitTransaction ${secret}`, { tx })
    return Promise.resolve(true)
  }
}
