import { Button } from '@material-ui/core'
import Modal from '@material-ui/core/Modal'
import GetAppIcon from '@material-ui/icons/GetApp'
import SendIcon from '@material-ui/icons/Send'
import React, { ReactNode, useState } from 'react'
import { BiWindowClose } from 'react-icons/bi'

interface UiHeaderProps {
  children?: ReactNode
  buttonLabel?: string
  disabled?: boolean
  title?: string
  type?: 'receive' | 'send'
}

export function WalletTransactionModal({ children, buttonLabel, disabled, title, type }: UiHeaderProps) {
  const [visible, setVisible] = useState<boolean>(false)

  const toggleVisible = () => !disabled && setVisible(() => !visible)
  const close = () => setVisible(() => false)
  return (
    <div>
      <Button
        onClick={toggleVisible}
        disabled={disabled}
        variant="contained"
        color="primary"
        startIcon={type === 'receive' ? <GetAppIcon /> : <SendIcon />}
      >
        {buttonLabel}
      </Button>

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
