import { CssBaseline, ThemeProvider, unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core'
import { SnackbarProvider } from 'notistack'
import React, { FC, useEffect, useState } from 'react'
import * as adapter from 'pouchdb-adapter-idb'

import { AppLayout } from './app-layout'
import { InjectorProvider, useDependencyInjector } from './core/data-access/core-injector'
import { CoreDatabase } from './core/data-access/core-database'
import { NetworkProvider, PricesProvider } from './network/data-access'
import { SettingsProvider } from './settings/data-access'
import { WalletProvider } from './wallet/provider'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#f92c8b',
    },
    secondary: {
      main: '#6f41e8',
    },
    mode: 'dark',
  },
})

export const DatabaseGuard: FC = ({ children }) => {
  const [isReady, setIsReady] = useState<boolean>(false)
  const injector = useDependencyInjector()

  useEffect(() => {
    const db: CoreDatabase = injector.get(CoreDatabase)
    db.load(adapter).then(setIsReady)
  }, [injector])

  return isReady ? (
    <SettingsProvider>
      <NetworkProvider>
        <PricesProvider>
          <WalletProvider>{children}</WalletProvider>
        </PricesProvider>
      </NetworkProvider>
    </SettingsProvider>
  ) : null
}

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={5}>
        <InjectorProvider>
          <DatabaseGuard>
            <AppLayout />
          </DatabaseGuard>
        </InjectorProvider>
      </SnackbarProvider>
    </ThemeProvider>
  )
}
