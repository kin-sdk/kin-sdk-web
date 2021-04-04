import { AccountBalance } from '@kin-wallet/services'
import React, { useState } from 'react'

export function WalletBalance({ balance }: { balance: AccountBalance }) {
  const [tokenName] = useState('Kin')
  const [tokenSymbol] = useState('KIN')
  return (
    <>
      {balance?.kin} {tokenName} ({tokenSymbol})
    </>
  )
}
