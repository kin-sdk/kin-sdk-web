import { CssBaseline, ThemeProvider, unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'
import { SnackbarProvider } from 'notistack'
import React from 'react'
import { NetworkProvider } from './network/data-access/network-provider'
import { AppLayout } from './app-layout'
import { WalletProvider } from './wallet/data-access/wallet-provider'

const theme = createMuiTheme({
  palette: {
    primary: blue,
    type: 'dark',
  },
})

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={5}>
        <NetworkProvider>
          <WalletProvider>
            <AppLayout />
          </WalletProvider>
        </NetworkProvider>
      </SnackbarProvider>
    </ThemeProvider>
  )
}
