import { Wallet } from '@kin-wallet/sdk'
import { Zoom } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import { useSnackbar } from 'notistack'
import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { WalletTransaction } from '../data-access'
import { WalletAddress } from './wallet-address'
import { WalletTransactionDialog } from './wallet-transaction-dialog'

export interface WalletItemDetailsProps {
  handleDelete: (wallet: Wallet) => Promise<void>
  sendTransaction: (tx: WalletTransaction) => Promise<[string, string?]>
  wallet: Wallet
}

export function WalletItemDetails({ handleDelete, sendTransaction, wallet }: WalletItemDetailsProps) {
  const { enqueueSnackbar } = useSnackbar()

  const onDelete = () => {
    if (window.confirm(`Are you sure?`)) {
      handleDelete(wallet).then(() => {
        enqueueSnackbar(`Account ${wallet?.name} deleted`, { variant: 'success' })
      })
    }
  }

  const onCopy = () => {
    enqueueSnackbar(`Copied secret to clipboard`, { variant: 'success' })
  }

  return (
    <div>
      <div className="flex justify-evenly">
        <WalletTransactionDialog wallet={wallet} type="receive" buttonLabel="Receive" title="Receive Kin" />
        <WalletTransactionDialog
          wallet={wallet}
          type="send"
          buttonLabel="Send"
          title="Send Kin"
          sendTransaction={sendTransaction}
          disabled={!wallet?.secret}
        />
      </div>
      <div className="flex justify-between items-center">
        <div>
          <WalletAddress publicKey={wallet?.publicKey} explorerUrl={wallet?.explorerUrl} />
        </div>
        <div className="flex items-center space-x-2">
          {wallet?.secret && (
            <CopyToClipboard text={wallet?.secret || 'no wallet secret found'} onCopy={onCopy}>
              <Tooltip TransitionComponent={Zoom} title="Copy secret to clipboard" placement="top">
                <IconButton size="small">
                  <VpnKeyIcon color="disabled" />
                </IconButton>
              </Tooltip>
            </CopyToClipboard>
          )}
          <Tooltip TransitionComponent={Zoom} title="Delete this account" placement="top">
            <IconButton size="small" onClick={onDelete}>
              <DeleteIcon color="disabled" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}
