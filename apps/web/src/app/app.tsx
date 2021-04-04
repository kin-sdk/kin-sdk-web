import React from 'react'
import { AppShell } from './app-shell'
import { NetworkDropdown } from './network-select/network-dropdown'
import { NetworksProvider, useNetwork } from './network-select/network.hook'
import { UiContainer } from './ui/ui-container'
import { UiHeader } from './ui/ui-header'

export function InnerApp() {
  const { networks, network, setNetwork } = useNetwork()
  return (
    <div className={'bg-gray-700 text-gray-300 min-h-screen relative'}>
      <UiHeader>
        <NetworkDropdown networks={networks} selected={network} onSelect={setNetwork} />
      </UiHeader>
      <UiContainer>
        <AppShell />
      </UiContainer>
    </div>
  )
}

export function App() {
  return (
    <NetworksProvider>
      <InnerApp />
    </NetworksProvider>
  )
}
