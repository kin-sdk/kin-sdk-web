import { Paper } from '@material-ui/core'
import BackIcon from '@material-ui/icons/ArrowLeft'
import React from 'react'
import { Link } from 'react-router-dom'

import { useSettings } from '../data-access'

export function SettingsIndex() {
  const { settings } = useSettings()

  return (
    <Paper elevation={5}>
      <div className="bg-gray-800 max-w-5xl md:max-w-2xl mx-auto py-1 md:py-3 px-3 md:px-4 h-full">
        <div className="flex justify-start space-x-2 items-center">
          <Link to="/">
            <BackIcon />
          </Link>
          <h2 className="flex-grow font-semibold text-lg">Settings</h2>
        </div>
      </div>
      <div className="p-4">
        <pre>{JSON.stringify(settings, null, 2)}</pre>
      </div>
    </Paper>
  )
}
