import { KinProd, KinTest } from '@kin-sdk/client'
import React, { VFC } from 'react'
import { KinNetwork } from './kin-utils'

interface AppFooterProps {
  network: KinNetwork
  setNetwork: (network: KinNetwork) => void
}

export const AppFooter: VFC<AppFooterProps> = ({ network, setNetwork }) => {
  return (
    <footer className="text-center">
      {network === KinTest && (
        <button onClick={() => setNetwork(KinProd)} className="btn btn-sm btn-primary">
          Switch to Network: Prod
        </button>
      )}
      {network === KinProd && (
        <button onClick={() => setNetwork(KinTest)} className="btn btn-sm btn-primary">
          Switch to Network: Test
        </button>
      )}
    </footer>
  )
}
