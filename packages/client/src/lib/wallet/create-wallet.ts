import { Keypair, Wallet } from '@kin-sdk/core'

/**
 * Simple helper method to create a Wallet structure, based on our intent
 * @param {"create" | "import" | "watch"} type
 * @param {Wallet} from
 * @returns {Wallet}
 */
export function createWallet(type: 'create' | 'import' | 'watch', from: Wallet = {}): Wallet {
  switch (type) {
    case 'create': {
      const keys = Keypair.randomKeys()
      return {
        ...from,
        ...keys,
      }
    }
    case 'import': {
      const keys = Keypair.fromSecret(from.secret)
      return {
        ...from,
        ...keys,
      }
    }
    case 'watch':
      return {
        ...from,
        secret: '',
      }
  }
}
