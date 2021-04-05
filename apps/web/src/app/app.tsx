import { CssBaseline, ThemeProvider, unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'
import { SnackbarProvider } from 'notistack'
import React from 'react'
import { AppLayout } from './app-layout'

import { DatabaseProvider } from './core/data-access'
import { NetworkProvider } from './network/data-access'
import { WalletProvider } from './wallet/data-access'

const theme = createMuiTheme({ palette: { primary: blue, type: 'dark' } })

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={5}>
        <DatabaseProvider>
          <NetworkProvider>
            <WalletProvider>
              <AppLayout />
            </WalletProvider>
          </NetworkProvider>
        </DatabaseProvider>
      </SnackbarProvider>
    </ThemeProvider>
  )
}
