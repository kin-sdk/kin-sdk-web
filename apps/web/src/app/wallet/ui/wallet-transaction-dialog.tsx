import { AccountDetails, Wallet } from '@kin-sdk/client'
import { Button, DialogActions, DialogContent, LinearProgress } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import GetAppIcon from '@material-ui/icons/GetApp'
import SendIcon from '@material-ui/icons/Send'
import VisibilityIcon from '@material-ui/icons/Visibility'
import Alert from '@material-ui/lab/Alert'
import LoadingButton from '@material-ui/lab/LoadingButton'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'

import QRCode from 'react-qr-code'
import { WalletTransaction } from '../data-access'
import { WalletAddress } from './wallet-address'
import { WalletTransactionForm } from './wallet-transaction-form'

export interface WalletTransactionDialogProps {
  buttonLabel?: string
  disabled?: boolean
  info?: AccountDetails
  sendTransaction?: (tx: WalletTransaction) => Promise<[string, string?]>
  title?: string
  type?: 'receive' | 'send' | 'watch'
  wallet: Wallet
}
const initialValues = { destination: '', amount: '1', memo: '' }

export function WalletTransactionDialog({
  buttonLabel,
  disabled,
  sendTransaction,
  title,
  type,
  wallet,
}: WalletTransactionDialogProps) {
  const { enqueueSnackbar } = useSnackbar()
  const [transaction, setTransaction] = useState<WalletTransaction>(initialValues)
  const [open, setOpen] = useState(false)
  const [disableForm, setDisableForm] = useState(false)
  const [error, setError] = useState<string>(null)
  const [success, setSuccess] = useState<string>(null)
  const [sending, setSending] = useState(false)

  const handleToggle = () => {
    resetFormState()
    setTransaction(initialValues)
    if (!disabled) {
      setOpen((prevOpen) => !prevOpen)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  const resetFormState = () => {
    setError(null)
    setSuccess(null)
  }

  const handleSubmitSuccess = ([res, err]: [string, string?]) => {
    enqueueSnackbar(res, { variant: 'success' })
    setSending(false)
    setSuccess(res)
    setError(err)
    setTimeout(() => {
      resetFormState()
      setDisableForm(false)
      handleClose()
    }, 1000)
  }

  const handleSubmitError = (err) => {
    enqueueSnackbar(err, { variant: 'error' })
    setError(err)
    setSuccess(null)
    setSending(false)
    setDisableForm(false)
  }

  const handleSubmit = () => {
    setSending(true)
    setDisableForm(true)
    resetFormState()
    return sendTransaction(transaction)
      .then((res) => {
        console.log('sendTransaction res', res)
        return handleSubmitSuccess(res)
      })
      .catch(handleSubmitError)
  }

  const isValid = () => {
    return (
      transaction?.destination?.length && transaction?.amount?.length && Number(transaction?.amount) > 0 && !sending
    )
  }

  function getIcon(type: 'receive' | 'send' | 'watch') {
    switch (type) {
      case 'receive':
        return <GetAppIcon />
      case 'watch':
        return <VisibilityIcon />
      case 'send':
        return <SendIcon />
    }
  }

  return (
    <div>
      <Button
        onClick={handleToggle}
        disabled={disabled}
        variant="contained"
        color="secondary"
        startIcon={getIcon(type)}
      >
        {buttonLabel}
      </Button>
      <Dialog aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title" className="capitalize flex items-center">
          <span className="mr-3">{type === 'receive' ? <GetAppIcon /> : <SendIcon />}</span>
          <span>{title}</span>
        </DialogTitle>
        <DialogContent>
          {type === 'receive' && (
            <div className="flex flex-col items-center justify-center space-y-6">
              <WalletAddress publicKey={wallet?.publicKey} explorerUrl={wallet?.explorerUrl} />
              <div className="p-4 bg-white">
                <QRCode value={wallet?.publicKey} />
              </div>
            </div>
          )}
          {type === 'send' && (
            <div className="max-w-5xl md:max-w-2xl mx-auto ">
              <WalletTransactionForm disableForm={disableForm} transaction={transaction} onChange={setTransaction} />
              {error || success ? (
                <div className="my-6 h-12">
                  {error && <Alert severity="error">{error}</Alert>}
                  {success && <Alert severity="success">{success}</Alert>}
                </div>
              ) : null}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" disabled={sending} onClick={handleClose} color="secondary">
            Close
          </Button>
          {type === 'send' && (
            <LoadingButton
              pending={sending}
              type="submit"
              disabled={!isValid()}
              variant="contained"
              onClick={handleSubmit}
              color="secondary"
            >
              {type}
            </LoadingButton>
          )}
        </DialogActions>
      </Dialog>
    </div>
  )
}
