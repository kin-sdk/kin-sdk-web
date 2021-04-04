import React, { useEffect, useState } from 'react'
import { BiLoaderAlt } from 'react-icons/bi'
import { useNetwork } from '../network-select/network.hook'
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
  const { network } = useNetwork()
  const [loading, setLoading] = useState<boolean>(true)

  const add = () => {
    console.log('add')
  }

  const refresh = () => {
    setLoading(() => true)
    console.log('Refresh')
    setTimeout(() => {
      setLoading(() => false)
    }, 1000)
  }

  useEffect(() => {
    console.log(`Network Changed: ${network.name}`)
    refresh()
  }, [network])

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

  return (
    <UiCard>
      <div>
        <WalletListHeader
          title={loading ? 'Loading...' : 'Main account Balances ($27.05)'}
          onAdd={add}
          onRefresh={refresh}
        />
        {loading ? (
          <div className="h-36 flex flex-col justify-center items-center">
            <div className="my-5 animate-pulse">
              <BiLoaderAlt className="text-6xl animate-spin" />
            </div>
          </div>
        ) : (
          wallets.map((wallet) => <WalletListItem key={wallet.id} wallet={wallet} />)
        )}
      </div>
    </UiCard>
  )
}
