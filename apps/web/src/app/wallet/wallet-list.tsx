import React, { useState } from 'react'
import { UiLogo } from '../ui/ui-logo'
import { BiChevronUp } from 'react-icons/bi'
// import UiPopup from '../ui/ui-popup'
import { CopyToClipboard } from 'react-copy-to-clipboard'

interface Wallet {
  id?: string
  name?: string
  seed?: string
  publicKey?: string
}

export function WalletList() {
  const wallets: Wallet[] = [
    {
      id: 'w',
      name: 'Account 1',
      seed: 'x',
      publicKey: 'B33hx7NmZXRiC5Rg2Er7pqdNeKLEm7a7uD8tt9zKG4pk',
    },
    {
      id: 'w',
      name: 'Account 2',
      seed: 'x',
      publicKey: 'B33hx7NmZXRiC5Rg2Er7pqdNeKLEm7a7uD8tt9zKG4pk',
    },
    {
      id: 'w',
      name: 'Account 3',
      seed: 'x',
      publicKey: 'B33hx7NmZXRiC5Rg2Er7pqdNeKLEm7a7uD8tt9zKG4pk',
    },
  ]
  return (
    <div>
      {wallets.map((wallet) => (
        <WalletListItem key={wallet.id} wallet={wallet} />
      ))}
    </div>
  )
}

export function WalletListItem({ wallet }: { wallet: Wallet }) {
  const [showDetails, setShowDetails] = useState(false)
  const [tokenName] = useState('KIN')
  const [tokenSymbol] = useState('KIN')
  const toggleDetails = () => setShowDetails(!showDetails)
  // const [buttonPopup, setButtonPopup] = useState(false)

  return (
    <>
      <div>
        <div className="px-6 py-4 hover:bg-gray-700 cursor-pointer" onClick={toggleDetails}>
          <div className="flex justify-between items-center">
            <div className="flex justify-between items-center space-x-2">
              <span>
                <UiLogo />
              </span>
              <div className="text-gray-100">
                150.000 {tokenName} ({tokenSymbol})
              </div>
              <div className="text-xs text-gray-400">{wallet.publicKey}</div>
            </div>
            <div className="flex justify-between items-center space-x-2">
              <span>$27.05</span>
              <button onClick={toggleDetails}>
                <BiChevronUp className="text-3xl" />
              </button>
            </div>
          </div>
        </div>
        {showDetails ? (
          <div className="px-6 py-4">
            <div className="flex justify-evenly">
              <button className="px-4 py-2 rounded-3xl border border-indigo-400 text-indigo-400 hover:bg-primary-400 hover:font-bold hover:text-white active:bg-indigo-400 ">
                Receive
              </button>
              <button className="px-4 py-2 rounded-3xl border border-indigo-400 text-indigo-400 hover:bg-primary-400 hover:font-bold hover:text-white">
                Send
              </button>
            </div>
            <div className="pt-2 flex flex-col ml-10">
              <a href="#" className="text-sm hover:underline text-blue-400">
                Token Name: {tokenName}
              </a>

              <hr className="border-1 stroke-1 border-opacity-25" />

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
      {/* <UiPopup trigger={buttonPopup}>
        <div onClick={() => setButtonPopup(true)}>
        </div>
    </UiPopup> */}
    </>
  )
}
