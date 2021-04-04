import { AppBar, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import { BiCog } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { NetworkDropdown } from '../network-select/network-dropdown'
import { useNetwork } from '../network-select/network.hook'

export function AppHeader() {
  const { networks, network, setNetwork } = useNetwork()

  return (
    <AppBar position="static">
      <Toolbar className="flex justify-between items-center">
        <Typography variant="h6" className={''}>
          <Link to="/">Kin Wallet</Link>
        </Typography>
        <div className="flex items-center">
          <NetworkDropdown networks={networks} selected={network} onSelect={setNetwork} />
          <Typography variant="h6" className={'ml-2 px-4'}>
            <Link to="/settings">
              <BiCog className="text-xl" />
            </Link>
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  )
}
