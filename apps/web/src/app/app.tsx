import { CssBaseline, ThemeProvider, unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'
import { SnackbarProvider } from 'notistack'
import React from 'react'
import { AppLayout } from './app-layout'

import { DatabaseProvider } from './core/data-access'
import { NetworkProvider, PricesProvider } from './network/data-access'
import { SettingsProvider } from './settings/data-access'
import { WalletProvider } from './wallet/data-access'

const theme = createMuiTheme({ palette: { primary: blue, type: 'dark' } })

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={5}>
        <DatabaseProvider>
          <SettingsProvider>
            <NetworkProvider>
              <PricesProvider>
                <WalletProvider>
                  <AppLayout />
                </WalletProvider>
              </PricesProvider>
            </NetworkProvider>
          </SettingsProvider>
        </DatabaseProvider>
      </SnackbarProvider>
    </ThemeProvider>
  )
}
