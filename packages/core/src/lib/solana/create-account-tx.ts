import { AccountSize, AuthorityType, TokenProgram } from './token-program'
import { MemoProgram } from './memo-program'
import { createKinMemo, TransactionType } from '@kin-tools/kin-memo'
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
  appIndex?: number,
): Transaction {
  const transaction = new Transaction({
    feePayer: config.subsidizer,
    recentBlockhash: recentBlockhash,
  })

  if (appIndex && appIndex > 0) {
    transaction.add(
      MemoProgram.memo({
        data: createKinMemo({
          appIndex,
          type: TransactionType.None,
        }),
      }),
    )
  } else {
    console.log('No appIndex')
  }

  transaction.add(
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

  return transaction
}
