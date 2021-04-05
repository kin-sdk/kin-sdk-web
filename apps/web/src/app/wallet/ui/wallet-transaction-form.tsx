import { FormControl, FormGroup, FormLabel, TextField } from '@material-ui/core'
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
          <FormLabel>Destination</FormLabel>
          <TextField
            margin="dense"
            autoFocus
            type="text"
            required
            variant="outlined"
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
            variant="outlined"
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
            variant="outlined"
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
