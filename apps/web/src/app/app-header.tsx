import { Wallet } from '@kin-sdk/client'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNetwork } from './network/data-access'
import { NetworkDropdown } from './network/ui'
import { useWallet, WalletAddType } from './wallet/data-access'
import { WalletAddDialog, WalletAddDropdown } from './wallet/ui'

export function AppHeader() {
  const { enqueueSnackbar } = useSnackbar()

  const { networks, network, setNetwork } = useNetwork()
  const { wallets, addWallet, reload } = useWallet()
  const [walletType, setWalletType] = useState<WalletAddType>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newName, setNewName] = useState<string>('')

  const handleAdd = (type: WalletAddType) => {
    setWalletType(type)
    setShowAddModal(true)
  }

  function handleOnClose(data: Wallet) {
    return addWallet([walletType, data])
      .then(() => reload())
      .then(() => {
        setShowAddModal(false)
        enqueueSnackbar(`Account ${data?.name} added`, { variant: 'success' })
      })
      .catch((err) => {
        enqueueSnackbar(err, { variant: 'error' })
        console.error(err)
      })
  }

  useEffect(() => {
    setNewName(() => `Account ${(wallets?.length || 0) + 1}`)
  }, [wallets])

  return (
    <>
      <AppBar position="static" color="secondary">
        <Toolbar className="flex justify-between items-center">
          <Typography variant="h6" className={''}>
            <Link to="/">Kin Wallet</Link>
          </Typography>
          <div className="flex items-center">
            <WalletAddDropdown onSelect={handleAdd} />
            <NetworkDropdown networks={networks} selected={network} onSelect={setNetwork} />
            {/*<Link to="/settings">*/}
            {/*  <SettingsIcon color="disabled" fontSize="small" />*/}
            {/*</Link>*/}
          </div>
        </Toolbar>
      </AppBar>
      {showAddModal && (
        <WalletAddDialog
          name={newName}
          type={walletType}
          open={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSubmit={(data) => handleOnClose(data)}
        />
      )}
    </>
  )
}
