import React, { ReactNode, useState } from 'react'

import { UiPopup } from '../ui/ui-popup'

interface UiHeaderProps {
  children?: ReactNode
  buttonLabel?: string
  title?: string
}

export function WalletPopup({ children, buttonLabel, title }: UiHeaderProps) {
  const [visible, setVisible] = useState<boolean>(false)

  const toggleVisible = () => setVisible(() => !visible)
  return (
    <div>
      <button
        onClick={toggleVisible}
        className="px-4 py-2 rounded-3xl border border-indigo-400 text-indigo-400 hover:bg-primary-400 hover:font-bold hover:text-white"
      >
        {buttonLabel}
      </button>
      <UiPopup setVisible={setVisible} visible={visible} title={title}>
        {children}
      </UiPopup>
    </div>
  )
}
