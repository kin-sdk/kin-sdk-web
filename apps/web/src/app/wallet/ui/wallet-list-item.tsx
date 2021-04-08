import { AccountBalance, AccountDetails, Wallet } from '@kin-sdk/services'
import { Avatar } from '@material-ui/core'
import cx from 'classnames'
import React, { useState } from 'react'
import { BiChevronUp } from 'react-icons/bi'
import { WalletStatus, WalletTransaction } from '../data-access'
import { WalletBalance } from './wallet-balance'
import { WalletItemDetails } from './wallet-item-details'
import { WalletItemError } from './wallet-item-error'

export function WalletListItem({
  wallet,
  open,
  balance,
  error,
  status,
  createAccount,
  handleDelete,
  handleTransaction,
}: {
  wallet: Wallet
  balance?: AccountBalance
  error?: string
  status?: WalletStatus
  open?: boolean
  createAccount?: (wallet: Wallet) => Promise<void>
  handleDelete?: (wallet: Wallet) => Promise<void>
  handleTransaction?: (wallet: Wallet, transaction: WalletTransaction) => Promise<[string, string?]>
}) {
  const [showDetails, setShowDetails] = useState(open)
  const toggleDetails = () => setShowDetails(() => !showDetails)
  const sendTransaction = (transaction: WalletTransaction) => {
    if (!wallet.secret) {
      return Promise.reject(`Error reading wallet secret`)
    }
    return handleTransaction(wallet, transaction)
  }

  const createTokenAccount = () => createAccount(wallet)

  return (
    <div className={cx({ ' x': showDetails })}>
      <div className="px-4 py-4 hover:bg-gray-700 cursor-pointer" onClick={toggleDetails}>
        <div className="flex justify-between items-center">
          <div className="flex justify-between items-center space-x-2">
            <Avatar alt="Kin Logo" src="assets/kin-logo-small.png" title="Kin Logo" />
            <div className=" flex flex-col">
              <div className="flex space-x-2 text-xl items-center">
                <div>{wallet.name}</div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center space-x-2">
            <div className="flex flex-col items-center">
              {balance ? (
                <WalletBalance balance={balance} />
              ) : (
                <div className="text-sm text-gray-500 animate-pulse">{status}</div>
              )}
            </div>
            <button onClick={toggleDetails}>
              <BiChevronUp className={cx('text-3xl transition transform', { 'rotate-180': showDetails })} />
            </button>
          </div>
        </div>
      </div>
      {showDetails || error ? (
        <div className="px-6 py-4 flex flex-col space-y-6">
          {error ? (
            <WalletItemError error={error} createTokenAccount={createTokenAccount} />
          ) : (
            <WalletItemDetails handleDelete={handleDelete} sendTransaction={sendTransaction} wallet={wallet} />
          )}
        </div>
      ) : null}
    </div>
  )
}
