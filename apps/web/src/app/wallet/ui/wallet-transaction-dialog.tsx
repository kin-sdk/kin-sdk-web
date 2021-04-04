import { AccountDetails } from '@kin-wallet/services'
import { Button, DialogActions, DialogContent, LinearProgress, TextField } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import GetAppIcon from '@material-ui/icons/GetApp'
import SendIcon from '@material-ui/icons/Send'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'

import QRCode from 'react-qr-code'
import { WalletAddress } from './wallet-address'

export interface WalletTransaction {
  destination: string
  amount: string
  memo?: string
}

export interface WalletTransactionDialogProps {
  buttonLabel?: string
  disabled?: boolean
  info?: AccountDetails
  title?: string
  type?: 'receive' | 'send'
  sendTransaction?: (transaction: WalletTransaction) => Promise<[string, string?]>
}

export function WalletTransactionDialog({
  buttonLabel,
  disabled,
  info,
  sendTransaction,
  title,
  type,
}: WalletTransactionDialogProps) {
  const { enqueueSnackbar } = useSnackbar()
  const [destination, setDestination] = useState<string>()
  const [amount, setAmount] = useState<string>('1')
  const [memo, setMemo] = useState<string>('')
  const [open, setOpen] = useState(false)
  const [disableForm, setDisableForm] = useState(false)
  const [error, setError] = useState<string>(null)
  const [success, setSuccess] = useState<string>(null)
  const [sending, setSending] = useState(false)

  const handleToggle = () => {
    if (!disabled) {
      setOpen((prevOpen) => !prevOpen)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = () => {
    setSending(true)
    setDisableForm(true)
    setError(null)
    setSuccess(null)
    return sendTransaction({
      amount,
      destination,
      memo,
    })
      .then(([res, err]) => {
        setError(null)
        setSending(false)
        setSuccess(res)
        setError(err)
        enqueueSnackbar(res, { variant: 'success' })
        setTimeout(() => {
          setDestination(null)
          setMemo(null)
          setSuccess(null)
          setError(null)
          setDisableForm(false)
          setAmount('1')
          handleClose()
        }, 1000)
      })
      .catch((err) => {
        enqueueSnackbar(err, { variant: 'error' })
        setError(err)
        setSending(false)
        setSuccess(null)
        setDisableForm(false)
      })
  }
  const isValid = () => {
    return destination?.length && amount?.length && Number(amount) > 0 && !sending
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
        <DialogTitle id="simple-dialog-title" className="capitalize flex items-center">
          <span className="mr-3">{type === 'receive' ? <GetAppIcon /> : <SendIcon />}</span>
          <span>{title}</span>
        </DialogTitle>
        <DialogContent style={{ width: 400 }}>
          {type === 'receive' && (
            <div className="flex flex-col items-center justify-center space-y-6">
              <WalletAddress publicKey={info?.publicKey} explorerUrl={info?.explorerUrl} />
              <div className="p-4 bg-white">
                <QRCode size={300} value={info.publicKey} />
              </div>
            </div>
          )}
          {type === 'send' && (
            <div className="max-w-5xl md:max-w-2xl mx-auto ">
              <div>
                <TextField
                  margin="dense"
                  autoFocus
                  label="Destination"
                  type="text"
                  required
                  disabled={disableForm}
                  value={destination}
                  onChange={(e) => setDestination(e.target?.value)}
                  fullWidth
                />

                <TextField
                  margin="dense"
                  label="Amount"
                  type="number"
                  required
                  disabled={disableForm}
                  value={amount}
                  onChange={(e) => setAmount(e.target?.value)}
                  fullWidth
                />

                <TextField
                  margin="dense"
                  label="Memo"
                  type="text"
                  disabled={disableForm}
                  value={memo}
                  onChange={(e) => setMemo(e.target?.value)}
                  fullWidth
                />
              </div>
              <div className="my-6 h-12">
                {sending ? <LinearProgress /> : ''}
                {error && <Alert severity="error">{error}</Alert>}
                {success && <Alert severity="success">{success}</Alert>}
              </div>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" disabled={sending} onClick={handleClose} color="primary">
            Close
          </Button>
          {type === 'send' && (
            <Button type="submit" disabled={!isValid()} variant="contained" onClick={handleSubmit} color="primary">
              {type}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  )
}
