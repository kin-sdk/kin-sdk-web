import { KinEnvironment, Network } from '@kin-sdk/core'
import axios from 'axios'
import { KinAgoraClient, SubmitPaymentOptions } from './kin-agora-client'

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

export class KinClient {
  private readonly client: KinAgoraClient

  constructor(private readonly network: Network) {
    console.log(`KinClient: ${network?.name}`)
    this.client = new KinAgoraClient(network?.env)
  }

  getPrices(): Promise<Prices> {
    return axios
      .get(`https://api.coingecko.com/api/v3/simple/price?ids=kin&vs_currencies=usd%2Cbtc&include_24hr_change=true`)
      .then((res) => res.data)
  }

  getExplorerUrl(publicKey: string): string {
    const baseUrl = `https://explorer.solana.com/address/${publicKey}`
    const params =
      this.network.env === KinEnvironment.Test ? `?cluster=custom&customUrl=https://local.validator.agorainfra.dev` : ''

    return `${baseUrl}/tokens${params}`
  }

  createAccount(secret: string) {
    return this.client.createAccount(secret)
  }

  submitPayment(options: SubmitPaymentOptions) {
    return this.client.submitPayment(options)
  }

  resolveTokenAccounts(publicKey: string) {
    return this.client.resolveTokenAccounts(publicKey)
  }
}
