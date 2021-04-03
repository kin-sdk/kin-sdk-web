import React, { useEffect, useState } from 'react'
import { AppShell } from './app-shell'
import { NetworkSelect, NetworkSelectOption } from './network-select/network-select'
import { UiContainer } from './ui/ui-container'
import { UiHeader } from './ui/ui-header'

const NETWORKS = [
  { value: 'mainnet', label: 'Mainnet' },
  { value: 'testnet', label: 'Testnet' },
]

export function App() {
  // TODO: useContext Network
  const [networks] = useState<NetworkSelectOption[]>(NETWORKS)
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkSelectOption>(null)

  useEffect(() => {
    if (!selectedNetwork) {
      setSelectedNetwork(() => networks[0])
    }
  }, [networks, selectedNetwork, setSelectedNetwork])

  return (
    <div className={'bg-gray-700 text-gray-300 min-h-screen relative'}>
      <UiHeader>
        <NetworkSelect networks={networks} selected={selectedNetwork} onSelect={setSelectedNetwork} />
      </UiHeader>
      <UiContainer>
        <AppShell />
      </UiContainer>
    </div>
  )
}
