import { KinWalletService, Network, NETWORKS } from '@kin-wallet/services'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useSettings } from '../../settings/data-access'

const NetworkContext = createContext<{
  network?: Network
  networks?: Network[]
  service?: KinWalletService
  setNetwork?: (network: Network) => void
}>(undefined)

function NetworkProvider({ children }: { children: ReactNode }) {
  const { settings, updateNetwork } = useSettings()
  const [networks] = useState<Network[]>(NETWORKS)
  const [network, setNetwork] = useState<Network>()
  const [service, setService] = useState<KinWalletService>()

  const handleSetNetwork = (val: Network) => {
    console.log('val, val', val)
    updateNetwork(val.id as any).then(() => {
      console.log('done')
    })
  }

  useEffect(() => {
    if (network) {
      setService(() => new KinWalletService(network))
    }
  }, [network])

  useEffect(() => {
    const find = networks.find((network) => network.id === settings?.network)
    setNetwork(find)
  }, [settings, networks, setNetwork])

  return (
    <NetworkContext.Provider value={{ network, networks, setNetwork: handleSetNetwork, service }}>
      {children}
    </NetworkContext.Provider>
  )
}

const useNetwork = () => useContext(NetworkContext)

export { NetworkProvider, useNetwork }
