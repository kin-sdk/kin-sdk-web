import { Network, NETWORKS } from '@kin-wallet/services'
import React, { createContext, ReactNode, useContext, useState } from 'react'

const NetworksContext = createContext<{
  network?: Network
  networks?: Network[]
  setNetwork?: (network: Network) => void
}>(undefined)

function NetworksProvider({ children }: { children: ReactNode }) {
  const [networks] = useState<Network[]>(NETWORKS)
  const [network, setNetwork] = useState<Network>(() => networks[0])

  return (
    <NetworksContext.Provider
      value={{
        network,
        networks,
        setNetwork,
      }}
    >
      {children}
    </NetworksContext.Provider>
  )
}

const useNetwork = () => useContext(NetworksContext)

export { NetworksProvider, useNetwork }
