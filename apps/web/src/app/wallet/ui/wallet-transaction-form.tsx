import { FormControl, FormGroup, TextField } from '@material-ui/core'
import React from 'react'
import { WalletTransaction } from '../data-access'

export interface WalletTransactionFormProps {
  disableForm?: boolean
  transaction?: WalletTransaction
  onChange: (tx: Partial<WalletTransaction>) => void
}

export function WalletTransactionForm({ disableForm, transaction, onChange }: WalletTransactionFormProps) {
  const handleInputChange = (e) => {
    const { name, value } = e.target
    onChange({ ...transaction, [name]: value })
  }

  return (
    <form noValidate autoComplete="off">
      <FormGroup>
        <FormControl>
          <TextField
            margin="dense"
            label="Destination"
            autoFocus
            type="text"
            required
            name="destination"
            disabled={disableForm}
            value={transaction?.destination}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            margin="dense"
            label="Amount"
            type="number"
            required
            name="amount"
            disabled={disableForm}
            value={transaction?.amount}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            margin="dense"
            label="Memo"
            type="text"
            name="memo"
            disabled={disableForm}
            value={transaction?.memo}
            onChange={handleInputChange}
          />
        </FormControl>
      </FormGroup>
    </form>
  )
}
