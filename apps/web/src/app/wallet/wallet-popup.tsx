import Modal from '@material-ui/core/Modal'
import cx from 'classnames'
import React, { ReactNode, useState } from 'react'
import { BiWindowClose } from 'react-icons/bi'

interface UiHeaderProps {
  children?: ReactNode
  buttonLabel?: string
  disabled?: boolean
  title?: string
}

export function WalletPopup({ children, buttonLabel, disabled, title }: UiHeaderProps) {
  const [visible, setVisible] = useState<boolean>(false)

  const toggleVisible = () => !disabled && setVisible(() => !visible)
  const close = () => setVisible(() => false)
  return (
    <div>
      <button
        onClick={toggleVisible}
        className={cx('px-4 py-2 rounded-3xl border  hover:font-bold hover:text-white', {
          'border-indigo-400 text-indigo-400 hover:bg-indigo-400': !disabled,
          'border-gray-400 text-gray-400 hover:bg-gray-400': disabled,
        })}
      >
        {buttonLabel}
      </button>
      <Modal
        open={visible}
        onClose={setVisible}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="absolute bg-gray-800 min-w-96">
          <div className="flex justify-between items-center p-4">
            <h2 className="flex-grow font-semibold uppercase">{title}</h2>
            <BiWindowClose className="text-xl hover:text-white text-gray-400" title="Close Popup" onClick={close} />
          </div>
          <div className="bg-gray-700 px-4 h-full">{children}</div>
        </div>
      </Modal>
    </div>
  )
}
