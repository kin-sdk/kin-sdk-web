import React from 'react'
import { AppShell } from './app-shell'
import { UiContainer } from './ui/ui-container'
import { UiHeader } from './ui/ui-header'

export function App() {
  return (
    <div className={'bg-gray-700 text-gray-300 min-h-screen'}>
      <UiHeader />
      <UiContainer>
        <AppShell />
      </UiContainer>
    </div>
  )
}
