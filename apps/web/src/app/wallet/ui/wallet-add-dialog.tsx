import { Wallet } from '@kin-sdk/client'
import { Button, DialogActions, DialogContent, DialogContentText, LinearProgress, TextField } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import LoadingButton from '@material-ui/lab/LoadingButton'

import React, { useState } from 'react'
import { WalletAddType } from '../data-access'

export interface WalletAddDialogProps {
  open: boolean
  name?: string
  type: WalletAddType
  onClose: () => void
  onSubmit: (wallet: Wallet) => Promise<void>
}

function getContent(type: WalletAddType) {
  switch (type) {
    case 'create':
      return 'You can create a new account that stores the keys in your browser.'
    case 'import':
      return 'You can import a wallet by providing the secret.'
    case 'watch':
      return 'You can add a wallet in watch mode to track its balance.'
  }
}

export function WalletAddDialog({ name, onClose, onSubmit, open, type }: WalletAddDialogProps) {
  const [accountName, setAccountName] = useState<string>(name)
  const [accountSecret, setAccountSecret] = useState<string>('')
  const [accountAddress, setAccountAddress] = useState<string>('')
  const [creating, setCreating] = useState(false)

  const handleClose = () => onClose()
  const handleSubmit = () => {
    setCreating(true)
    onSubmit({
      publicKey: accountAddress,
      name: accountName,
      secret: accountSecret,
    }).then()
  }

  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title" className="capitalize">
        {type} Account
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{getContent(type)}</DialogContentText>
        <TextField
          margin="dense"
          disabled={creating}
          autoFocus={type === 'create'}
          label="Account Name"
          type="text"
          required={true}
          value={accountName}
          onChange={(e) => setAccountName(e.target?.value)}
          fullWidth
        />
        {type === 'import' ? (
          <TextField
            autoFocus={type === 'import'}
            margin="dense"
            disabled={creating}
            label="Secret"
            type="text"
            value={accountSecret}
            onChange={(e) => setAccountSecret(e.target?.value)}
            fullWidth
          />
        ) : null}

        {type === 'watch' ? (
          <TextField
            autoFocus={type === 'watch'}
            margin="dense"
            disabled={creating}
            label="Watch Address"
            type="text"
            value={accountAddress}
            onChange={(e) => setAccountAddress(e.target?.value)}
            fullWidth
          />
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button disabled={creating} variant="contained" onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <LoadingButton
          pending={creating}
          disabled={creating}
          type="submit"
          variant="contained"
          onClick={handleSubmit}
          color="primary"
        >
          {type}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}
