import { CssBaseline, ThemeProvider, unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'
import { SnackbarProvider } from 'notistack'
import React from 'react'
import { AppShell } from './app-shell'
import { NetworksProvider } from './network-select/network.hook'
import { UiContainer } from './ui/ui-container'
import { UiHeader } from './ui/ui-header'

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
        <NetworksProvider>
          <UiHeader />
          <UiContainer>
            <AppShell />
          </UiContainer>
        </NetworksProvider>
      </SnackbarProvider>
    </ThemeProvider>
  )
}
