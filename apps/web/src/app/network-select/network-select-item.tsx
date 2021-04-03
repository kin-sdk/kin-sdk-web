import cx from 'classnames'
import React from 'react'
import { BiGlobe } from 'react-icons/bi'
import { NetworkSelectOption } from './network-select'

export interface NetworkSelectItemProps {
  network?: NetworkSelectOption
  selected?: NetworkSelectOption
  onSelect?: (network: NetworkSelectOption) => void
}

export function NetworkSelectItem({ selected, network, onSelect }: NetworkSelectItemProps) {
  const select = () => onSelect(network)
  return (
    <button
      onClick={select}
      key={network.value}
      className={cx(
        'w-full flex items-center px-4 py-2 space-x-2 text-primary hover:bg-indigo-200 hover:text-gray-900 hover:font-bold',
        {
          'bg-indigo-100 text-indigo-800': selected === network,
        },
      )}
      role="menuitem"
    >
      <BiGlobe className="text-xl" />
      <span>{network.label}</span>
    </button>
  )
}
