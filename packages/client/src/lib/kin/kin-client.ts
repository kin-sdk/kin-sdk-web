import { KinEnvironment, Network, PrivateKey, TransactionType } from '@kin-sdk/core'
import axios from 'axios'
import { retry } from 'ts-retry-promise'
import { KinAgoraClient, KinAgoraClientOptions } from '../agora/kin-agora-client'
import { SubmitPaymentOptions } from '../agora/submit-payment-options'

const sleep = (seconds = 1) => new Promise((resolve) => setTimeout(resolve, seconds * 1000))
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

export function getExplorerUrl(env: KinEnvironment, publicKey: string): string {
  const baseUrl = `https://explorer.solana.com/address/${publicKey}`
  const params = env === KinEnvironment.Test ? `?cluster=custom&customUrl=https://local.validator.agorainfra.dev` : ''

  return `${baseUrl}/tokens${params}`
}

export function getPrices(): Promise<Prices> {
  return axios
    .get(`https://api.coingecko.com/api/v3/simple/price?ids=kin&vs_currencies=usd%2Cbtc&include_24hr_change=true`)
    .then((res) => res.data)
}

export interface KinClientOptions extends KinAgoraClientOptions {
  appIndex?: number
}

export class KinClient {
  private readonly client: KinAgoraClient

  constructor(private readonly network: Network, private readonly options: KinClientOptions = {}) {
    this.client = new KinAgoraClient(network?.env, this.options)
    console.log(`KinClient: ${network?.name}`, this.options)
  }

  getPrices(): Promise<Prices> {
    return getPrices()
  }

  getExplorerUrl(publicKey: string): string {
    return getExplorerUrl(this.network.env, publicKey)
  }

  createAccount(secret: string) {
    return this.client.createAccount(secret)
  }

  async hasTokenAccounts(publicKey: string) {
    const [tokenAccounts] = await this.client.resolveTokenAccounts(publicKey)
    return !!tokenAccounts
  }

  async ensureAccount(secret: string): Promise<[any[], string?]> {
    const owner = PrivateKey.fromString(secret)
    const publicKey = owner.publicKey().toBase58()
    const hasTokenAccounts = await this.hasTokenAccounts(publicKey)

    if (!hasTokenAccounts) {
      console.log(`NO token Accounts`, publicKey)
      await this.createAccount(secret)

      let counter = 0
      let found = 0
      const required = 5

      try {
        await retry(
          async () => {
            counter++
            console.log(`Finding token Accounts ${found}/${required} in ${counter}`)

            if (found >= required) {
              console.log(`Found token accounts!`)
              return this.client.resolveTokenAccounts(publicKey)
            }

            const foundTokenAccounts = await this.hasTokenAccounts(publicKey)
            console.log('foundTokenAccounts', foundTokenAccounts)

            return new Promise((resolve, reject) => {
              if (!foundTokenAccounts) {
                return reject(`No accounts found for ${publicKey}`)
              }

              if (foundTokenAccounts) {
                found++
                return reject(`Not enough tokenAccounts found for ${publicKey} `)
              }
            })
          },
          { retries: 9, delay: 500, backoff: 'LINEAR' },
        )
      } catch (e) {
        return [null, e]
      }
    } else {
      const [tokenAccounts] = await this.client.resolveTokenAccounts(publicKey)
      console.log(`FOUND token Accounts`, publicKey, tokenAccounts)
      return [tokenAccounts]
    }
  }

  submitPayment(options: SubmitPaymentOptions) {
    return this.client.submitPayment(options)
  }

  requestAirdrop(publicKey: string, amount: string) {
    return this.client.requestAirdrop(publicKey, amount)
  }

  resolveTokenAccounts(publicKey: string) {
    return this.client.resolveTokenAccounts(publicKey)
  }
}
