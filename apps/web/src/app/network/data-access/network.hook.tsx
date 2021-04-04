import { Network, NETWORKS } from '@kin-wallet/services'
import React, { createContext, ReactNode, useContext, useState } from 'react'

const NetworkContext = createContext<{
  network?: Network
  networks?: Network[]
  setNetwork?: (network: Network) => void
}>(undefined)

function NetworkProvider({ children }: { children: ReactNode }) {
  const [networks] = useState<Network[]>(NETWORKS)
  const [network, setNetwork] = useState<Network>(() => networks[0])

  return (
    <NetworkContext.Provider
      value={{
        network,
        networks,
        setNetwork,
      }}
    >
      {children}
    </NetworkContext.Provider>
  )
}

const useNetwork = () => useContext(NetworkContext)

export { NetworkProvider, useNetwork }
