import { AccountDetails, Wallet } from '@kin-wallet/services'
import { Avatar } from '@material-ui/core'
import cx from 'classnames'
import React, { useState } from 'react'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import { WalletAddress } from './wallet-address'
import { WalletBalance } from './wallet-balance'

import { WalletTransactionModal } from './wallet-transaction-modal'

export function WalletListItem({ wallet, info }: { wallet: Wallet; info: AccountDetails }) {
  const [showDetails, setShowDetails] = useState(true)
  const toggleDetails = () => setShowDetails(() => !showDetails)

  return (
    <div className={cx({ 'bg-gray-700': showDetails })}>
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
            <div className="flex flex-col">
              <WalletBalance balance={info?.balance} />
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
            <WalletTransactionModal type="receive" buttonLabel="Receive" title="Receive Kin">
              <div className="w-128 py-4">
                <pre>{JSON.stringify(wallet, null, 2)}</pre>
              </div>
            </WalletTransactionModal>
            <WalletTransactionModal type="send" buttonLabel="Send" title="Send Kin" disabled={!wallet.secret}>
              <div className="w-128 py-4">
                <pre>{JSON.stringify(wallet, null, 2)}</pre>
              </div>
            </WalletTransactionModal>
          </div>
          <div className="flex justify-center">
            <WalletAddress publicKey={info.publicKey} explorerUrl={info.explorerUrl} />
          </div>
        </div>
      ) : null}
    </div>
  )
}