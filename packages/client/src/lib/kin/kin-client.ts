import { KinEnvironment, Network, PrivateKey } from '@kin-sdk/core'
import axios from 'axios'
import { retry } from 'ts-retry-promise'
import { KinAccountBalance, KinAgoraClient, KinAgoraClientOptions } from '../agora/kin-agora-client'
import { SubmitPaymentOptions } from '../agora/submit-payment-options'

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

export interface EnsureAccountOptions {
  backoff?: 'FIXED' | 'EXPONENTIAL' | 'LINEAR'
  delay?: number
  retries?: number
  confirmations?: number
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

  createAccount(secret: string): Promise<[string, string?]> {
    return this.client.createAccount(secret)
  }

  async hasTokenAccounts(publicKey: string): Promise<boolean> {
    const [tokenAccounts] = await this.client.getBalances(publicKey)
    return !!tokenAccounts
  }

  async ensureAccount(
    secret: string,
    { backoff, confirmations, delay, retries }: EnsureAccountOptions,
  ): Promise<[KinAccountBalance[], string?]> {
    confirmations = confirmations || 5
    retries = retries || 20
    delay = delay || 500
    backoff = backoff || 'LINEAR'
    const owner = PrivateKey.fromString(secret)
    const publicKey = owner.publicKey().toBase58()
    const hasTokenAccounts = await this.hasTokenAccounts(publicKey)

    if (!hasTokenAccounts) {
      console.log(`NO token Accounts`, publicKey)
      await this.createAccount(secret)

      let counter = 0
      let found = 0

      try {
        await retry(
          async () => {
            counter++
            console.log(`Finding token Accounts found ${found} of ${confirmations} (attempt ${counter})`)

            if (found >= confirmations) {
              console.log(`Found the required amount of token accounts!`)
              return this.client.getBalances(publicKey)
            }

            const foundTokenAccounts = await this.hasTokenAccounts(publicKey)

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
          { retries, delay, backoff },
        )
      } catch (e) {
        return [null, e]
      }
    } else {
      const [tokenAccounts] = await this.client.getBalances(publicKey)
      console.log(`FOUND token Accounts`, publicKey, tokenAccounts)
      return [tokenAccounts]
    }
  }

  async submitPayment(options: SubmitPaymentOptions): Promise<[string, string?]> {
    const [desination, error] = await this.client.getBalances(options.destination)
    if (error) {
      return [null, error]
    }
    if (!desination.length || !desination[0].account) {
      return [null, `Error fetching balance for Destination Account`]
    }
    return this.client.submitPayment({ ...options, destination: desination[0].account })
  }

  requestAirdrop(publicKey: string, amount: string): Promise<[string, string?]> {
    return this.client.requestAirdrop(publicKey, amount)
  }

  resolveTokenAccounts(publicKey: string) {
    console.warn(`DEPRECATED Method 'resolveTokenAccounts'. Use 'getBalances' instead.`)
    return this.getBalances(publicKey)
  }

  getBalances(publicKey: string): Promise<[KinAccountBalance[], string?]> {
    return this.client.getBalances(publicKey)
  }
}
