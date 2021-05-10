import { createWallet, KinProd, Wallet } from '@kin-sdk/client'
import React, { useEffect, useState, VFC } from 'react'
import { AppFooter } from './app-footer'
import { AppWallet } from './app-wallet'
import { KinNetwork } from './kin-utils'

export const App: VFC = () => {
  const [network, setNetwork] = useState<KinNetwork>(KinProd)
  const [wallet, setWallet] = useState<Wallet>(null)

  useEffect(() => {
    if (!wallet) {
      generateWallet()
    }
  }, [wallet, setWallet])

  const generateWallet = () => setWallet(() => createWallet('create'))

  return (
    <div className="d-flex flex-column h-100 px-3 container-fluid">
      <div className="flex-shrink-0">
        <AppWallet network={network} wallet={wallet} />
      </div>
      <div className="text-center mt-3">
        <button onClick={generateWallet} className="btn btn-sm btn-primary mb-3">
          Generate Wallet
        </button>
        <AppFooter network={network} setNetwork={setNetwork} />
      </div>
    </div>
  )
}
