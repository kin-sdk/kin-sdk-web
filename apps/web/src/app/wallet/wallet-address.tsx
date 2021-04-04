import { elipsify } from '@kin-wallet/services'
import { Zoom } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'
import { useSnackbar } from 'notistack'
import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { BiLinkExternal } from 'react-icons/bi'

export function WalletAddress({ explorerUrl, publicKey }: { explorerUrl?: string; publicKey: string }) {
  const { enqueueSnackbar } = useSnackbar()
  const onCopy = () => enqueueSnackbar(`Copied address to clipboard`, { variant: 'success' })
  return (
    <div className="flex space-x-2 text-xs text-gray-400 items-center">
      <Tooltip TransitionComponent={Zoom} title="Click to copy" placement="top">
        <CopyToClipboard text={publicKey} onCopy={onCopy}>
          <button>
            <span className="hidden md:block">{publicKey}</span>
            <span className="block md:hidden">{elipsify(publicKey)}</span>
          </button>
        </CopyToClipboard>
      </Tooltip>
      {explorerUrl ? (
        <a href={explorerUrl} target="_blank" rel="noopener noreferrer">
          <BiLinkExternal />
        </a>
      ) : null}
    </div>
  )
}
