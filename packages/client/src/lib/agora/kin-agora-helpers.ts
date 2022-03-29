import {
  kinToQuarks,
  Memo,
  MemoProgram,
  PublicKey,
  SolanaPublicKey,
  SolanaTransaction,
  TokenProgram,
} from '@kin-sdk/core'

export function createSolanaTransaction({
  type,
  publicKey,
  tokenAccount,
  destination,
  kinAmount,
  memo,
  tokenProgram,
  subsidizer,
  appIndex,
}): SolanaTransaction {
  const owner = PublicKey.fromBase58(publicKey).solanaKey()
  let feePayer: SolanaPublicKey
  if (subsidizer) {
    feePayer = new SolanaPublicKey(subsidizer)
  } else {
    feePayer = owner
  }
  const instructions = []

  if (appIndex) {
    const fk = Buffer.alloc(29)
    const kinMemo = Memo.new(1, type, appIndex, fk)
    instructions.push(MemoProgram.memo({ data: kinMemo.buffer.toString('base64') }))
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

  if (memo?.length) {
    instructions.push(MemoProgram.memo({ data: memo }))
  }

  return new SolanaTransaction({ feePayer: feePayer }).add(...instructions)
}
