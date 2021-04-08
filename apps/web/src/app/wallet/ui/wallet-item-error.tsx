import { Button } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React from 'react'

export function WalletItemError({ error, createTokenAccount }: { error: string; createTokenAccount }) {
  return error === 'No Kin token accounts found' ? (
    <div className="flex justify-center">
      <Button variant="contained" color="secondary" size="large" onClick={createTokenAccount}>
        Create Token Account
      </Button>
    </div>
  ) : (
    <Alert severity="error" variant="outlined">
      {typeof error === 'string' ? error : `An Error Occurred ${(error as any)?.message}`}
    </Alert>
  )
}
