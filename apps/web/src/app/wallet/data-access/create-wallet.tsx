import { Keypair, Wallet } from '@kin-wallet/services'

/**
 * Some helper method to create a Wallet structure, based on our intent
 * @param {"create" | "import" | "watch"} type
 * @param {Wallet} wallet
 * @returns {Wallet}
 */
export function createWallet(type: 'create' | 'import' | 'watch', wallet: Wallet): Wallet {
  switch (type) {
    case 'watch':
      return {
        name: wallet.name,
        publicKey: wallet.publicKey,
        secret: '',
      }
    case 'import': {
      const keys = Keypair.fromSecret(wallet.secret)
      return {
        name: wallet.name,
        ...keys,
      }
    }
    case 'create': {
      const keys = Keypair.randomKeys()
      return {
        name: wallet.name,
        ...keys,
      }
    }
  }
}
