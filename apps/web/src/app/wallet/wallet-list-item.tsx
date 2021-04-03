import cx from 'classnames'
import React, { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import { UiLogo } from '../ui/ui-logo'
import { WalletAddress } from './wallet-address'
import { Wallet } from './wallet-list'
import { WalletPopup } from './wallet-popup'

export function WalletListItem({ wallet }: { wallet: Wallet }) {
  const [showDetails, setShowDetails] = useState(false)
  const [tokenName] = useState('Kin')
  const [tokenSymbol] = useState('KIN')
  const toggleDetails = () => setShowDetails(() => !showDetails)

  return (
    <div className={cx({ 'bg-gray-700': showDetails })}>
      <div className="px-4 py-4 hover:bg-gray-700 cursor-pointer" onClick={toggleDetails}>
        <div className="flex justify-between items-center">
          <div className="flex justify-between items-center space-x-2">
            <span>
              <UiLogo />
            </span>
            <div className=" flex flex-col">
              <div className="text-gray-100">
                150.000 {tokenName} ({tokenSymbol})
              </div>
              <WalletAddress publicKey={wallet.publicKey} />
            </div>
          </div>
          <div className="flex justify-between items-center space-x-2">
            <span>$27.05</span>
            <button onClick={toggleDetails}>
              {showDetails ? <BiChevronDown className="text-3xl" /> : <BiChevronUp className="text-3xl" />}
            </button>
          </div>
        </div>
      </div>
      {showDetails ? (
        <div className="px-6 py-4">
          <div className="flex justify-evenly">
            <WalletPopup buttonLabel="Receive" title="Receive Kin">
              <div className="w-128 py-4">
                <pre>{JSON.stringify(wallet, null, 2)}</pre>
              </div>
            </WalletPopup>
            <WalletPopup buttonLabel="Send" title="Send Kin">
              <div className="w-128 py-4">
                <pre>{JSON.stringify(wallet, null, 2)}</pre>
              </div>
            </WalletPopup>
          </div>
          <div className="pt-2 flex flex-col space-y-3">
            <a href="#" className="text-sm hover:underline text-blue-400">
              Token Name: {tokenName}
            </a>

            <hr className="border-1 border-gray-300 stroke-1 border-opacity-25" />

            <a href="#" className="text-sm hover:underline text-blue-400">
              Token Symbol: {tokenSymbol}
            </a>
            <div className="flex justify-between pt-2">
              <a href="#" className="text-primary font-bold hover:underline">
                View on Solana
              </a>
              <CopyToClipboard text="acaBackend.post.ref" onCopy={''}>
                <a href="#" className="text-primary font-bold hover:underline">
                  Export
                </a>
              </CopyToClipboard>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
