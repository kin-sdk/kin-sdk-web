import { Wallet } from '@kin-wallet/services'
import { Button, DialogActions, DialogContent, DialogContentText, TextField } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import React, { useState } from 'react'

export type WalletAddType = 'create' | 'import' | 'watch'
export interface WalletAddDialogProps {
  open: boolean
  name?: string
  type: WalletAddType
  onClose: (wallet: Wallet) => void
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

export function WalletAddDialog({ name, onClose, open, type }: WalletAddDialogProps) {
  const [accountName, setAccountName] = useState<string>(name)
  const [accountSecret, setAccountSecret] = useState<string>('')
  const [accountAddress, setAccountAddress] = useState<string>('')

  const handleClose = () =>
    onClose({
      publicKey: accountAddress,
      name: accountName,
      secret: accountSecret,
    })
  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title" className="capitalize">
        {type} Account
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{getContent(type)}</DialogContentText>
        <TextField
          margin="dense"
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
            label="Watch Address"
            type="text"
            value={accountAddress}
            onChange={(e) => setAccountAddress(e.target?.value)}
            fullWidth
          />
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button type="submit" variant="contained" onClick={handleClose} color="default">
          {type}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
