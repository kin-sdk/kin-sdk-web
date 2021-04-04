import { Network } from '@kin-wallet/sdk'
import cx from 'classnames'
import React from 'react'
import { BiGlobe } from 'react-icons/bi'

export interface NetworkSelectItemProps {
  network?: Network
  selected?: Network
  onSelect?: (network: Network) => void
}

export function NetworkDropdownItem({ selected, network, onSelect }: NetworkSelectItemProps) {
  const select = () => onSelect(network)
  return (
    <button
      onClick={select}
      key={network.id}
      className={cx(
        'w-full flex items-center px-4 py-2 space-x-2 text-primary hover:bg-indigo-200 hover:text-gray-900 hover:font-bold',
        {
          'bg-indigo-100 text-indigo-800': selected === network,
        },
      )}
      role="menuitem"
    >
      <BiGlobe className="text-xl" />
      <span>{network.name}</span>
    </button>
  )
}
