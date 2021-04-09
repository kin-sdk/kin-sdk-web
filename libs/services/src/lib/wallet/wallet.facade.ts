import { Wallet } from '@kin-wallet/sdk'

import { KinClient } from '../kin'
import { Collection } from '../db'

import { WalletAPI, WalletTransaction } from './interfaces'
import { createWallet } from './create-wallet'

export class WalletDatabase {
  createItem(wallet: Wallet): Promise<Wallet> {
    return Promise.resolve(wallet)
  }
}

/**
 * The Facade handles all the complexity of interacting with the WalletDatase and KinWallet
 * This facade does NOT cache state... but should transform/prepare data before/after async actions
 *
 * NOTE: Each method is a promise-based API; the facade does NOT cache any data.
 */
export class WalletFacade implements WalletAPI {
  constructor(private db: Collection<Wallet>, private client: KinClient) {}

  async addWallet([walletAddType, source]): Promise<Wallet> {
    const wallet = createWallet(walletAddType, source)
    const item = await this.db.createItem(wallet)
    return item
  }

  deleteWallet(wallet: Wallet) {}
  reloadWallets() {}
  refreshPrices() {}
  createAccount(wallet: Wallet) {}
  sendTransaction(wallet: Wallet, tx: WalletTransaction) {}
}
