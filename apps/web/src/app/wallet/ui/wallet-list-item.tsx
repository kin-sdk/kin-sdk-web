import { AccountBalance, AccountDetails, Wallet } from '@kin-wallet/services'
import { Avatar, Zoom } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import { Alert } from '@material-ui/lab'
import cx from 'classnames'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import { WalletStatus, WalletTransaction } from '../data-access'
import { WalletAddress } from './wallet-address'
import { WalletBalance } from './wallet-balance'

import { WalletTransactionDialog } from './wallet-transaction-dialog'

export function WalletListItem({
  wallet,
  open,
  balance,
  status,
  info,
  handleDelete,
  handleTransaction,
}: {
  wallet: Wallet
  balance?: AccountBalance
  status?: WalletStatus
  open?: boolean
  info: AccountDetails
  handleDelete?: (wallet: Wallet) => Promise<boolean>
  handleTransaction?: (wallet: Wallet, transaction: WalletTransaction) => Promise<[string, string?]>
}) {
  const { enqueueSnackbar } = useSnackbar()
  const [showDetails, setShowDetails] = useState(open)
  const toggleDetails = () => setShowDetails(() => !showDetails)
  const sendTransaction = (transaction: WalletTransaction) => {
    if (!wallet.secret) {
      return Promise.reject(`Error reading wallet secret`)
    }
    return handleTransaction(wallet, transaction)
  }

  function onCopy() {
    enqueueSnackbar(`Copied secret to clipboard`, { variant: 'success' })
  }

  function onDelete() {
    if (window.confirm(`Are you sure?`)) {
      handleDelete(wallet).then(() => {
        enqueueSnackbar(`Account ${wallet.name} deleted`, { variant: 'success' })
      })
    }
  }

  return (
    <div className={cx({ ' x': showDetails })}>
      <div className="px-4 py-4 hover:bg-gray-700 cursor-pointer" onClick={toggleDetails}>
        <div className="flex justify-between items-center">
          <div className="flex justify-between items-center space-x-2">
            <Avatar alt="Kin Logo" src="assets/kin-logo.svg" title="Kin Logo" />
            <div className=" flex flex-col">
              <div className="flex space-x-2 text-xl items-center">
                <div>{wallet.name}</div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center space-x-2">
            <div className="flex flex-col items-center">
              {info?.error ? (
                <Alert severity="error" variant="outlined">
                  {info?.error}
                </Alert>
              ) : balance ? (
                <WalletBalance balance={balance} />
              ) : (
                <div className="text-sm text-gray-500 animate-pulse">{status}</div>
              )}
            </div>
            <button onClick={toggleDetails}>
              {showDetails ? <BiChevronDown className="text-3xl" /> : <BiChevronUp className="text-3xl" />}
            </button>
          </div>
        </div>
      </div>
      {showDetails ? (
        <div className="px-6 py-4 flex flex-col space-y-6">
          <div className="flex justify-evenly">
            <WalletTransactionDialog info={info} type="receive" buttonLabel="Receive" title="Receive Kin" />
            <WalletTransactionDialog
              info={info}
              type="send"
              buttonLabel="Send"
              title="Send Kin"
              sendTransaction={sendTransaction}
              disabled={!wallet.secret}
            />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <WalletAddress publicKey={wallet?.publicKey} explorerUrl={info?.explorerUrl} />
            </div>
            <div className="flex items-center space-x-2">
              {wallet.secret && (
                <CopyToClipboard text={wallet.secret || 'no wallet secret found'} onCopy={onCopy}>
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
      ) : null}
    </div>
  )
}
