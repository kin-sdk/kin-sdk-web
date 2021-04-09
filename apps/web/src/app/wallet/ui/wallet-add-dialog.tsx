import { Wallet } from '@kin-sdk/client'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  FormGroup,
  TextField,
} from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import LoadingButton from '@material-ui/lab/LoadingButton'

import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { WalletAddType } from '../data-access'
import { getWalletResolver, WalletAddFormInputs } from './wallet-form-validation'

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
  const [wallet] = useState<Wallet>({ name })
  const [pending, setPending] = useState<boolean>(false)
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<WalletAddFormInputs>({
    defaultValues: {
      name: wallet.name,
    },
    resolver: getWalletResolver(type),
  })

  const onSubmitForm = handleSubmit((data) => {
    setPending(true)
    onSubmit(data).then((res) => {
      console.log('handleSubmit done', res)
      setPending(false)
    })
  })

  const hasErrors = Boolean(Object.values(errors).map((item) => !!item.message)?.length)
  const handleClose = () => onClose()

  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open}>
      <form noValidate autoComplete="off" onSubmit={onSubmitForm}>
        <DialogTitle id="simple-dialog-title" className="capitalize">
          {type} Account
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{getContent(type)}</DialogContentText>
          <FormGroup>
            <Controller
              name="name"
              control={control}
              defaultValue={wallet?.name}
              rules={{ required: true }}
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    disabled={pending}
                    label="Name"
                    margin="normal"
                    error={!!errors?.name?.message}
                    helperText={errors?.name?.message}
                    required
                    {...field}
                  />
                </FormControl>
              )}
            />

            {type === 'import' && (
              <Controller
                name="secret"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <TextField
                      disabled={pending}
                      hidden={type !== 'import'}
                      label="Secret"
                      margin="normal"
                      error={!!errors?.secret?.message}
                      helperText={errors?.secret?.message}
                      required
                      {...field}
                    />
                  </FormControl>
                )}
              />
            )}

            {type === 'watch' && (
              <Controller
                name="publicKey"
                control={control}
                defaultValue={wallet?.publicKey}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <TextField
                      disabled={pending}
                      label="Public Key"
                      margin="normal"
                      error={!!errors?.publicKey?.message}
                      helperText={errors?.publicKey?.message}
                      required
                      {...field}
                    />
                  </FormControl>
                )}
              />
            )}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button disabled={pending} variant="contained" onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <LoadingButton pending={pending} variant="contained" color="primary" type="submit" disabled={hasErrors}>
            {type}
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  )
}
