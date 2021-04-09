import { createWallet, KinClient } from '@kin-sdk/client'
import { Wallet } from '@kin-sdk/core'
import { Collection } from '../../core/data-access'
import { WalletTransaction } from './interfaces/wallet-transaction'
import { WalletAPI } from './interfaces/wallet.store'

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
