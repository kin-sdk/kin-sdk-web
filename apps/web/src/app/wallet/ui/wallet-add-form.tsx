import { Wallet } from '@kin-sdk/core'

import React, { FC } from 'react'
import { WalletAddType } from '../data-access'

export interface WalletAddFormProps {
  disableForm?: boolean
  wallet?: Wallet
  type?: WalletAddType
  onClose?: () => void
  onSubmit: (wallet: Partial<Wallet>) => Promise<boolean>
}

export const WalletAddForm: FC<WalletAddFormProps> = ({ wallet, onClose, onSubmit, type }) => {
  return <div />
}
