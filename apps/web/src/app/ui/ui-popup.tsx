import React, { ReactNode } from 'react'
import { BiWindowClose } from 'react-icons/bi'
interface UiPopupProps {
  children?: ReactNode
  title?: string
  setVisible: (value: boolean) => void
  visible?: boolean
}

export function UiPopup({ children, title, setVisible, visible }: UiPopupProps) {
  const close = () => setVisible(false)
  return visible ? (
    <div className="absolute z-1 inset-0  w-full  flex items-center justify-center">
      <div className="relative border border-gray-800 rounded shadow-lg">
        <div className="bg-gray-800 min-w-96">
          <div className="flex justify-between items-center p-4">
            <h2 className="flex-grow font-semibold uppercase">{title}</h2>
            <BiWindowClose className="text-xl hover:text-white text-gray-400" title="Close Popup" onClick={close} />
          </div>
          <div className="bg-gray-700 px-4 h-full">{children}</div>
        </div>
      </div>
    </div>
  ) : null
}
