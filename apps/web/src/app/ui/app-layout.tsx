import React from 'react'
import { AppShell } from '../app-shell'
import { AppHeader } from './app-header'

export function AppLayout() {
  return (
    <>
      <AppHeader />
      <div className="max-w-5xl md:max-w-2xl mx-auto py-3 md:py-6 lg:py-12 px-3 md:px-6 lg:px-8 h-full">
        <AppShell />
      </div>
    </>
  )
}
