import { AppBar, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import { NetworkDropdown } from '../network-select/network-dropdown'
import { useNetwork } from '../network-select/network.hook'

// function AccountsButton() {
//   return (
//     <Button className={'flex items-center'}>
//       <BiWallet className="text-xl mr-2" />
//       <span>Accounts</span>
//     </Button>
//   )
// }

export function UiHeader() {
  const { networks, network, setNetwork } = useNetwork()

  return (
    <AppBar position="static">
      <Toolbar className="flex justify-between items-center">
        <Typography variant="h6" className={''}>
          <Link to="/">Kin Wallet</Link>
        </Typography>
        <div>
          {/*<Link component={AccountsButton} to="/accounts" />*/}

          <NetworkDropdown networks={networks} selected={network} onSelect={setNetwork} />
        </div>
      </Toolbar>
    </AppBar>
  )
}
