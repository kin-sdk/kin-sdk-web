import React from 'react'
import { elipsify } from '../utils'

export function WalletAddress({ publicKey }: { publicKey: string }) {
  return (
    <>
      <div className="text-xs text-gray-400 hidden md:block">{publicKey}</div>
      <div className="text-xs text-gray-400 block md:hidden">{elipsify(publicKey)}</div>
    </>
  )
}
