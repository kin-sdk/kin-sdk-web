import { AccountSize, AuthorityType, TokenProgram } from './token-program'
import { PublicKey as SolanaPublicKey, SystemProgram, Transaction } from '@solana/web3.js'

export interface ServiceConfigKeys {
  subsidizer: SolanaPublicKey
  tokenProgram: SolanaPublicKey
  tokenKey: SolanaPublicKey
}

export function getCreateAccountTx(
  recentBlockhash: string,
  owner: SolanaPublicKey,
  config: ServiceConfigKeys,
  minBalance: number,
): Transaction {
  return new Transaction({
    feePayer: config.subsidizer,
    recentBlockhash: recentBlockhash,
  }).add(
    SystemProgram.createAccount({
      fromPubkey: config.subsidizer,
      newAccountPubkey: owner,
      lamports: minBalance,
      space: AccountSize,
      programId: config.tokenProgram,
    }),
    TokenProgram.initializeAccount(
      {
        account: owner,
        mint: config.tokenKey,
        owner: owner,
      },
      config.tokenProgram,
    ),
    TokenProgram.setAuthority(
      {
        account: owner,
        currentAuthority: owner,
        newAuthority: config.subsidizer,
        authorityType: AuthorityType.CloseAccount,
      },
      config.tokenProgram,
    ),
  )
}
