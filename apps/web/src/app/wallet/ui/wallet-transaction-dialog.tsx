import { AccountDetails } from '@kin-wallet/services'
import { Button, DialogActions, DialogContent, DialogContentText, TextField } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import GetAppIcon from '@material-ui/icons/GetApp'
import SendIcon from '@material-ui/icons/Send'
import React, { ReactNode, useState } from 'react'
import { WalletAddress } from './wallet-address'
import QRCode from 'react-qr-code'
interface UiHeaderProps {
  info?: AccountDetails
  buttonLabel?: string
  disabled?: boolean
  title?: string
  type?: 'receive' | 'send'
}

export function WalletTransactionDialog({ buttonLabel, disabled, info, title, type }: UiHeaderProps) {
  const [destination, setDestination] = useState<string>()
  const [amount, setAmount] = useState<number>(1)
  const [memo, setMemo] = useState<string>('')
  const [open, setOpen] = useState(false)

  const handleToggle = () => {
    if (!disabled) {
      setOpen((prevOpen) => !prevOpen)
    }
  }

  const handleClose = (event) => {
    setOpen(false)
  }

  return (
    <div>
      <Button
        onClick={handleToggle}
        disabled={disabled}
        variant="contained"
        color="primary"
        startIcon={type === 'receive' ? <GetAppIcon /> : <SendIcon />}
      >
        {buttonLabel}
      </Button>

      <Dialog aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title" className="capitalize">
          {title}
        </DialogTitle>
        <DialogContent>
          {type === 'receive' && (
            <div className="flex flex-col items-center justify-center space-y-6">
              <WalletAddress publicKey={info?.publicKey} explorerUrl={info?.explorerUrl} />
              <div className="p-4 bg-white">
                <QRCode size={350} value={info.publicKey} />
              </div>
            </div>
          )}
          {type === 'send' && (
            <div>
              <TextField
                margin="dense"
                autoFocus
                label="Destination"
                type="text"
                required={true}
                value={destination}
                onChange={(e) => setDestination(e.target?.value)}
                fullWidth
              />

              <TextField
                margin="dense"
                label="Amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target?.value))}
                fullWidth
              />

              <TextField
                margin="dense"
                label="Memo"
                type="text"
                value={memo}
                onChange={(e) => setMemo(e.target?.value)}
                fullWidth
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose} color="primary">
            Close
          </Button>
          {type === 'send' && (
            <Button type="submit" variant="contained" onClick={handleClose} color="default">
              {type}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  )
}
