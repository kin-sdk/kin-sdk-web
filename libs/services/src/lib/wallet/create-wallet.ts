import { Keypair, Wallet } from '@kin-wallet/sdk'

/**
 * Some helper method to create a Wallet structure, based on our intent
 * @param {"create" | "import" | "watch"} type
 * @param {Wallet} from
 * @returns {Wallet}
 */
export function createWallet(type: 'create' | 'import' | 'watch', from: Wallet): Wallet {
  switch (type) {
    case 'watch':
      return {
        name: from.name,
        publicKey: from.publicKey,
        secret: '',
      }
    case 'import': {
      const keys = Keypair.fromSecret(from.secret)
      return {
        name: from.name,
        ...keys,
      }
    }
    case 'create': {
      const keys = Keypair.randomKeys()
      return {
        name: from.name,
        ...keys,
      }
    }
  }
}
