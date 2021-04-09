import { AccountBalance, BalanceResult, Wallet } from '@kin-sdk/client'
import { createStore, UseStore, Subscribe, InjectionToken } from '@mindspace-io/react'
import { WalletAddType } from './interfaces/wallet-add-type'
import { WalletStatusEnum } from './interfaces/wallet-status.type'
import { WalletTransaction } from './interfaces/wallet-transaction'
import { WalletStore } from './interfaces/wallet.store'

import { WalletFacade } from './wallet.facade'

export const TOKEN_WALLET_STORE = new InjectionToken('makeWalletStore() Token')

/**
 * makeWalletStore() uses DI to inject instance of WalletFacade;
 *
 * @returns [ UseStore<WalletStore>, Subscribe<WalletStore> ]
 *  - the reactive `useWallets()` hook used to select partial or full store (must be used in component)
 *  - the `observe()` to directly, externally watch for store changes WITHOUT hooks
 */
export const makeWalletStore = (facade: WalletFacade): [UseStore<WalletStore>, Subscribe<WalletStore>] => {
  const useWallets = createStore<WalletStore>(({ set, setIsLoading, get, applyTransaction, addComputedProperty }) => {
    const store = {
      wallets: [],
      selectedWallet: null,
      status: WalletStatusEnum.Unknown,

      balance: {} as BalanceResult,
      accountBalance: {} as Record<string, AccountBalance>,
      totalBalance: {} as AccountBalance,

      addWallet(packet: [WalletAddType, Wallet]) {
        setIsLoading()
        facade.addWallet(packet).then((wallet) => {
          applyTransaction(() => {
            setIsLoading(false)
            set((s) => {
              s.wallets.push(wallet)
            })
          })
        })
      },
      deleteWallet(wallet: Wallet) {},
      reloadWallets() {},
      refreshPrices() {
        console.log('I will Refresh Prices!')
        return Promise.resolve()
      },
      createAccount(wallet: Wallet) {},
      sendTransaction(wallet: Wallet, tx: WalletTransaction) {},
    }

    return addComputedProperty(store, {
      name: 'totalBalance',
      selectors: (s) => s.wallets,
      transform: (): AccountBalance => null,
    })
  })

  return [useWallets, useWallets.observe]
}
