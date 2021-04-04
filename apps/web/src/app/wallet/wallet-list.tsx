import { CircularProgress, Paper } from '@material-ui/core'
import React from 'react'
import { BiLoaderAlt } from 'react-icons/bi'
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
    <Paper elevation={5}>
      <div>
        <WalletListHeader
          title={loading ? 'Loading...' : `Total Balance $${balance?.total?.usd} ₿${balance?.total?.btc}`}
          onAdd={add}
          onRefresh={refresh}
        />
        {loading ? (
          <div className="h-36 flex flex-col justify-center items-center">
            <CircularProgress size={60} color="secondary" />
          </div>
        ) : (
          <div className="divide-y divide-gray-800">
            {wallets.map((wallet) => (
              <WalletListItem key={wallet.id} wallet={wallet} info={balance.addressMap[wallet.publicKey]} />
            ))}
          </div>
        )}
      </div>
    </Paper>
  )
}
