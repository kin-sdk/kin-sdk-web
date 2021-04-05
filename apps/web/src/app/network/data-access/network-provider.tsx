import { Network, NETWORKS } from '@kin-wallet/services'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useSettings } from '../../settings/data-access'

const NetworkContext = createContext<{
  network?: Network
  networks?: Network[]
  setNetwork?: (network: Network) => void
}>(undefined)

function NetworkProvider({ children }: { children: ReactNode }) {
  const { settings, updateNetwork } = useSettings()
  const [networks] = useState<Network[]>(NETWORKS)
  const [network, setNetwork] = useState<Network>()

  const handleSetNetwork = (val: Network) => {
    console.log('val, val', val)
    updateNetwork(val.id as any).then(() => {
      console.log('done')
    })
  }

  useEffect(() => {
    const find = networks.find((network) => network.id === settings?.network)
    setNetwork(find)
  }, [settings, networks, setNetwork])

  return (
    <NetworkContext.Provider value={{ network, networks, setNetwork: handleSetNetwork }}>
      {children}
    </NetworkContext.Provider>
  )
}

const useNetwork = () => useContext(NetworkContext)

export { NetworkProvider, useNetwork }
