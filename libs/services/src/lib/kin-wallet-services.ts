import { KinEnvironment, Network } from '@kin-wallet/sdk'
import axios from 'axios'
import { KinClient } from './kin-client'

export interface AccountBalance {
  kin?: string
  usd?: string
  btc?: string
}

export interface AccountDetails {
  balance: AccountBalance
  publicKey: string
  explorerUrl: string
  error?: string
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

export interface Prices {
  kin: {
    btc: number
    btc_24h_change: number
    usd: number
    usd_24h_change: number
  }
}

export class KinWalletService {
  readonly client: KinClient

  constructor(private readonly network: Network, private readonly baseUrl = 'https://services.kintegrate.dev/api/') {
    console.log(`KinWalletService: ${network?.name}`)
    this.client = new KinClient(network?.env)
    this.getPrices()
  }

  api(path: string, params?: string) {
    return axios.get(`${this.baseUrl}${path}?env=${this.network?.env}${params}`).then((res) => res.data)
  }

  getBalance(publicKey: string | string[]): Promise<BalanceResult> {
    publicKey = Array.isArray(publicKey) ? publicKey : [publicKey]
    return this.api('prices', `&publicKey=${publicKey.join(',')}`)
  }

  getPrices(): Promise<Prices> {
    return axios
      .get(`https://api.coingecko.com/api/v3/simple/price?ids=kin&vs_currencies=usd%2Cbtc&include_24hr_change=true`)
      .then((res) => res.data)
  }
}
