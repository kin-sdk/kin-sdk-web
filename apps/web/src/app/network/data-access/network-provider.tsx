import { Network, NETWORKS } from '@kin-wallet/services'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useSettings } from '../../settings/data-access'

const NetworkContext = createContext<{
  network?: Network
  networks?: Network[]
  setNetwork?: (network: Network) => void
}>(undefined)

function NetworkProvider({ children }: { children: ReactNode }) {
  const { settings } = useSettings()
  const [networks] = useState<Network[]>(NETWORKS)
  const [network, setNetwork] = useState<Network>()

  useEffect(() => {
    const find = networks.find((network) => network.id === settings?.network)
    setNetwork(find)
  }, [settings, networks, setNetwork])

  return <NetworkContext.Provider value={{ network, networks, setNetwork }}>{children}</NetworkContext.Provider>
}

const useNetwork = () => useContext(NetworkContext)

export { NetworkProvider, useNetwork }
