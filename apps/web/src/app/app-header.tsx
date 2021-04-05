import { Wallet } from '@kin-wallet/services'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNetwork } from './network/data-access'
import { NetworkDropdown } from './network/ui'
import { useWallet, WalletAddType } from './wallet/data-access'
import { WalletAddDialog, WalletAddDropdown } from './wallet/ui'

export function AppHeader() {
  const { networks, network, setNetwork } = useNetwork()
  const { wallets, addWallet } = useWallet()
  const [walletType, setWalletType] = useState<WalletAddType>(null)
  const [showAddModal, setShowAddModal] = useState(false)

  const handleAdd = (type: WalletAddType) => {
    setWalletType(type)
    setShowAddModal(true)
  }

  function handleOnClose(data: Wallet) {
    addWallet([walletType, data])
      .then((res) => {
        console.log('RES RES RES', res)
      })
      .catch((err) => {
        console.log('ERR ERR ERR', err)
      })
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar className="flex justify-between items-center">
          <Typography variant="h6" className={''}>
            <Link to="/">Kin Wallet</Link>
          </Typography>
          <div className="flex items-center">
            <WalletAddDropdown onSelect={handleAdd} />
            <NetworkDropdown networks={networks} selected={network} onSelect={setNetwork} />
          </div>
        </Toolbar>
      </AppBar>
      <WalletAddDialog
        name={`Account ${wallets?.length + 1}`}
        type={walletType}
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={(data) => handleOnClose(data)}
      />
    </>
  )
}
