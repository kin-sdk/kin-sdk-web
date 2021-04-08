import { kinToQuarks, MemoProgram, PublicKey, SolanaPublicKey, SolanaTransaction, TokenProgram } from '@kin-sdk/core'

export function createSolanaTransaction({
  publicKey,
  tokenAccount,
  destination,
  kinAmount,
  memo,
  tokenProgram,
  subsidizer,
}): SolanaTransaction {
  const owner = PublicKey.fromBase58(publicKey).solanaKey()
  let feePayer: SolanaPublicKey
  if (subsidizer) {
    feePayer = new SolanaPublicKey(subsidizer)
  } else {
    feePayer = owner
  }
  const instructions = []

  if (memo?.length) {
    instructions.push(MemoProgram.memo({ data: memo }))
  }

  instructions.push(
    TokenProgram.transfer(
      {
        source: PublicKey.fromBase58(tokenAccount).solanaKey(),
        dest: PublicKey.fromBase58(destination).solanaKey(),
        owner,
        amount: BigInt(kinToQuarks(kinAmount.toString())),
      },
      new SolanaPublicKey(tokenProgram),
    ),
  )

  return new SolanaTransaction({ feePayer: feePayer }).add(...instructions)
}
