import { unstable_createMuiStrictModeTheme as createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core'
import { orange } from '@material-ui/core/colors'
import { SnackbarProvider } from 'notistack'
import React from 'react'
import { AppShell } from './app-shell'
import { NetworksProvider } from './network-select/network.hook'
import { UiContainer } from './ui/ui-container'
import { UiHeader } from './ui/ui-header'

const theme = createMuiTheme({
  // status: {
  //   danger: orange[500],
  // },
})

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={5}>
        <NetworksProvider>
          <div className={'bg-gray-700 text-gray-300 min-h-screen relative'}>
            <UiHeader />
            <UiContainer>
              <AppShell />
            </UiContainer>
          </div>
        </NetworksProvider>
      </SnackbarProvider>
    </ThemeProvider>
  )
}
