import React, { createContext, ReactNode, useContext } from 'react'
import { Setting } from './interfaces/setting'

export interface AppSettings {
  network: 'mainnet' | 'testnet'
}

const SettingsContext = createContext<{
  settings?: AppSettings
  setSettings?: (setting: Setting) => void
}>(undefined)

function SettingsProvider({ children }: { children: ReactNode }) {
  const settings: AppSettings = {
    network: 'mainnet',
  }

  return <SettingsContext.Provider value={{ settings }}>{children}</SettingsContext.Provider>
}

const useSettings = () => useContext(SettingsContext)

export { SettingsProvider, useSettings }
