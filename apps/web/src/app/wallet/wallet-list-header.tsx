import React from 'react'
import { BiRefresh, BiPlus } from 'react-icons/bi'

interface UiHeaderCardProps {
  title: string
  onAdd: () => void
  onRefresh: () => void
}

export function WalletListHeader({ title, onAdd, onRefresh }: UiHeaderCardProps) {
  return (
    <div className="bg-gray-800 max-w-5xl md:max-w-2xl mx-auto py-3 md:py-6 px-3 md:px-4 h-full">
      <div className="flex justify-between">
        <h2 className="flex-grow font-semibold text-lg">{title}</h2>
        <div className="flex justify-evenly">
          <BiPlus onClick={onAdd} className="text-3xl stroke-0 hover:bg-primary-400 rounded-full w-10" />
          <BiRefresh onClick={onRefresh} className="text-3xl stroke-0 hover:bg-primary-400 rounded-full w-10" />
        </div>
      </div>
    </div>
  )
}
