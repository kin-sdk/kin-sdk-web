import React from 'react'
import { UiCard } from '../ui/ui-card'
import { WalletListHeader } from './wallet-list-header'
import { WalletListItem } from './wallet-list-item'

export interface Wallet {
  id?: string
  name?: string
  seed?: string
  publicKey?: string
}

export function WalletList() {
  const wallets: Wallet[] = [
    {
      id: 'w1',
      name: 'Account 1',
      seed: 'x',
      publicKey: 'B33hx7NmZXRiC5Rg2Er7pqdNeKLEm7a7uD8tt9zKG4pk',
    },
    {
      id: 'w2',
      name: 'Account 2',
      seed: 'x',
      publicKey: 'B33hx7NmZXRiC5Rg2Er7pqdNeKLEm7a7uD8tt9zKG4pk',
    },
    {
      id: 'w3',
      name: 'Account 3',
      seed: 'x',
      publicKey: 'B33hx7NmZXRiC5Rg2Er7pqdNeKLEm7a7uD8tt9zKG4pk',
    },
  ]

  const add = () => {
    console.log('add')
  }

  const refresh = () => {
    console.log('refresh')
  }

  return (
    <UiCard>
      <WalletListHeader title="Main account Balances ($27.05)" onAdd={add} onRefresh={refresh} />
      {wallets.map((wallet) => (
        <WalletListItem key={wallet.id} wallet={wallet} />
      ))}
    </UiCard>
  )
}
