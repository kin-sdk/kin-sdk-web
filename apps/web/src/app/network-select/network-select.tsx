import React, { useState } from 'react'
import { BiGlobe, BiLoader } from 'react-icons/bi'
import { NetworkSelectItem } from './network-select-item'

export interface NetworkSelectOption {
  value: string
  label: string
}

export interface NetworkSelectProps {
  networks?: NetworkSelectOption[]
  selected?: NetworkSelectOption
  onSelect?: (option: NetworkSelectOption) => void
}

export function NetworkSelect({ selected, networks, onSelect }: NetworkSelectProps) {
  const [visible, setVisible] = useState<boolean>(false)
  const toggleVisible = () => setVisible(() => !visible)
  const select = (option: NetworkSelectOption) => {
    onSelect(option)
    setVisible(false)
  }
  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={toggleVisible}
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          aria-expanded="true"
          aria-haspopup="true"
        >
          {selected ? (
            <div className={'flex items-center space-x-2'}>
              <BiGlobe className="text-xl" />
              <span>{selected?.label || ''}</span>
            </div>
          ) : (
            <div className={'flex items-center space-x-2 text-gray-400'}>
              <BiLoader className="text-xl animate-spin " />
              <span>{'Loading'}</span>
            </div>
          )}
        </button>
      </div>
      {visible ? (
        <div
          role="menu"
          className="origin-top-right absolute right-0 mt-4 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
          aria-orientation="vertical"
        >
          <div className="py-1" role="none">
            {networks.map((network) => (
              <NetworkSelectItem key={network.value} onSelect={select} network={network} selected={selected} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
