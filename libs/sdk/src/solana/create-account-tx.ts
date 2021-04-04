import { AccountSize, AuthorityType, TokenProgram } from './token-program';
import {
  PublicKey as SolanaPublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';

export function getCreateAccountTx(
  recentBlockhash: string,
  tokenAccount: SolanaPublicKey,
  owner: SolanaPublicKey,
  subsidizer: SolanaPublicKey,
  tokenProgram: SolanaPublicKey,
  token: SolanaPublicKey,
  minBalance: number
): Transaction {
  return new Transaction({
    feePayer: subsidizer,
    recentBlockhash: recentBlockhash,
  }).add(
    SystemProgram.createAccount({
      fromPubkey: subsidizer,
      newAccountPubkey: tokenAccount,
      lamports: minBalance,
      space: AccountSize,
      programId: tokenProgram,
    }),
    TokenProgram.initializeAccount(
      {
        account: tokenAccount,
        mint: token,
        owner: owner,
      },
      tokenProgram
    ),
    TokenProgram.setAuthority(
      {
        account: tokenAccount,
        currentAuthority: owner,
        newAuthority: subsidizer,
        authorityType: AuthorityType.CloseAccount,
      },
      tokenProgram
    )
  );
}
