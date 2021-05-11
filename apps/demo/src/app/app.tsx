import { createWallet, KinClientOptions, KinProd, KinTest, Wallet } from '@kin-sdk/client'
import React, { useEffect, useState, VFC } from 'react'
import { AppWallet } from './app-wallet'
import { KinNetwork } from './kin-utils'

const ENV_APP_INDEX = process.env.NX_KIN_APP_INDEX || null
const ENV_NETWORK = process.env.NX_KIN_NETWORK || 'Prod'
const ENV_SECRET = process.env.NX_KIN_WALLET_SECRET || null

const envNetwork: KinNetwork = ENV_NETWORK === 'Test' ? KinTest : KinProd
const appIndex: number = ENV_APP_INDEX ? Number(ENV_APP_INDEX) : null

export const App: VFC = () => {
  const [network] = useState<KinNetwork>(envNetwork)
  const [options] = useState<KinClientOptions>({ appIndex })
  const [wallet, setWallet] = useState<Wallet>(null)

  useEffect(() => {
    if (!wallet) {
      generateWallet()
    }
  }, [wallet, setWallet])

  const generateWallet = () => setWallet(() => ENV_SECRET ? createWallet('import', { secret: ENV_SECRET }) :  createWallet('create'))

  return (
    <div className="d-flex flex-column h-100 px-3 container-fluid">
      <div className="flex-shrink-0">
        <AppWallet network={network} options={options} wallet={wallet} />
      </div>
      { !ENV_SECRET &&
        <div className="text-center mt-3">
          <button onClick={generateWallet} className="btn btn-sm btn-primary mb-3">
            Generate Wallet
          </button>
        </div>
      }
    </div>
  )
}
