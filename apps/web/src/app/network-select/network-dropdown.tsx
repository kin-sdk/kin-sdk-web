import { Network } from '@kin-wallet/sdk'
import React, { useState } from 'react'
import { BiGlobe, BiLoader } from 'react-icons/bi'
import { NetworkDropdownItem } from './network-dropdown-item'

export interface NetworkSelectProps {
  networks?: Network[]
  selected?: Network
  onSelect?: (network: Network) => void
}

export function NetworkDropdown({ selected, networks, onSelect }: NetworkSelectProps) {
  const [visible, setVisible] = useState<boolean>(false)
  const toggleVisible = () => setVisible(() => !visible)
  const select = (option: Network) => {
    onSelect(option)
    setVisible(false)
  }
  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={toggleVisible}
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-indigo-300 shadow-sm px-4 py-2 bg-indigo-200 font-medium text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-100 focus:ring-indigo-500"
          aria-expanded="true"
          aria-haspopup="true"
        >
          {selected ? (
            <div className={'flex items-center space-x-2'}>
              <BiGlobe className="text-xl" />
              <span>{selected?.name || ''}</span>
            </div>
          ) : (
            <div className={'flex items-center space-x-2 text-indigo-400'}>
              <BiLoader className="text-xl animate-spin " />
              <span>{'Loading'}</span>
            </div>
          )}
        </button>
      </div>
      {visible ? (
        <div
          role="menu"
          className="origin-top-right absolute right-0 mt-4 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-indigo-100 focus:outline-none"
          aria-orientation="vertical"
        >
          <div className="py-1" role="none">
            {networks.map((network) => (
              <NetworkDropdownItem key={network.id} onSelect={select} network={network} selected={selected} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
