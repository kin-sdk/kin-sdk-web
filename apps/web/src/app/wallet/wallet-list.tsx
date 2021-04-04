import React from 'react'
import { BiLoaderAlt } from 'react-icons/bi'
import { UiCard } from '../ui/ui-card'
import { useWallets } from './wallet-hook'
import { WalletListHeader } from './wallet-list-header'
import { WalletListItem } from './wallet-list-item'

export interface Wallet {
  id?: string
  name?: string
  secret?: string
  publicKey?: string
}

export function WalletList() {
  const [wallets, balance, loading, refresh] = useWallets()

  const add = () => {
    console.log('add')
  }
  return (
    <UiCard>
      <div>
        <WalletListHeader
          title={loading ? 'Loading...' : `Total Balance $${balance?.total?.usd} ₿${balance?.total?.btc}`}
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
          <div className="divide-y divide-gray-700">
            {wallets.map((wallet) => (
              <WalletListItem key={wallet.id} wallet={wallet} info={balance.addressMap[wallet.publicKey]} />
            ))}
          </div>
        )}
      </div>
    </UiCard>
  )
}
