import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useDatabase } from '../../core/data-access'
import { Setting } from './interfaces/setting'

export type AppSettingsNetwork = 'mainnet' | 'testnet'

export interface AppSettings {
  network?: AppSettingsNetwork
}

const SettingsContext = createContext<{
  settings?: AppSettings
  setSettings?: (setting: Setting) => void
  updateNetwork?: (value: AppSettingsNetwork) => Promise<void>
}>(undefined)

function SettingsProvider({ children }: { children: ReactNode }) {
  const [db] = useDatabase()
  const [dbSettings, setDbSettings] = useState<Setting[]>([])
  const [settings, setSettings] = useState<AppSettings>({})

  const updateNetwork = async (value: AppSettingsNetwork) => {
    db.settings.updateItem('network', { value }).then(() => {
      loadSettings()
    })
  }

  const loadSettings = async () => {
    db?.settings?.findMany().then(setDbSettings)
  }

  useEffect(() => {
    if (dbSettings.length) {
      const network = dbSettings.find((setting) => setting.id === 'network')
      if (network?.value) {
        setSettings((settings) => ({ ...settings, network: network?.value as AppSettingsNetwork }))
      }
    } else {
      updateNetwork('mainnet')
    }
  }, [dbSettings, setDbSettings])

  useEffect(() => {
    loadSettings()
  }, [db])

  return <SettingsContext.Provider value={{ settings, updateNetwork }}>{children}</SettingsContext.Provider>
}

const useSettings = () => useContext(SettingsContext)

export { SettingsProvider, useSettings }
