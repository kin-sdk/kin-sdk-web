import { CssBaseline, ThemeProvider, unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core'
import { SnackbarProvider } from 'notistack'
import React, { VFC } from 'react'
import { AppGuard } from './app-guard'

import { AppLayout } from './app-layout'
import { InjectorProvider } from './core/data-access/core-injector'

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

export const App: VFC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <SnackbarProvider maxSnack={5}>
      <InjectorProvider>
        <AppGuard>
          <AppLayout />
        </AppGuard>
      </InjectorProvider>
    </SnackbarProvider>
  </ThemeProvider>
)
