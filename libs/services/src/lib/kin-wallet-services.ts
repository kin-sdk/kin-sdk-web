import { KinEnvironment, Network } from '@kin-wallet/sdk'
import axios from 'axios'

export interface AccountBalance {
  kin?: string
  usd?: string
  btc?: string
}

export interface AccountDetails {
  balance: AccountBalance
  publicKey: string
  explorerUrl: string
}

export interface BalanceResult {
  environment: KinEnvironment
  duration: number
  addressMap: { [key: string]: AccountDetails }
  addresses: AccountDetails[]
  prices: {
    kin: AccountBalance
  }
  total: AccountBalance
}

export class KinWalletService {
  readonly baseUrl = 'https://services.kintegrate.dev/api/'

  constructor(private readonly network: Network) {
    console.log(`KinWalletService: environment: ${network.name}`)
  }

  api(path: string, params?: string) {
    return axios.get(`${this.baseUrl}${path}?env=${this.network.env}${params}`).then((res) => res.data)
  }

  getBalance(publicKey: string | string[]): Promise<BalanceResult> {
    publicKey = Array.isArray(publicKey) ? publicKey : [publicKey]
    return this.api('prices', `&publicKey=${publicKey.join(',')}`)
  }
}
