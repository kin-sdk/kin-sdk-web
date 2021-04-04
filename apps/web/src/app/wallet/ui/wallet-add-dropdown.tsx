import { ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt'
import VisibilityIcon from '@material-ui/icons/Visibility'
import React, { useEffect, useRef, useState } from 'react'
import { WalletAddType } from './wallet-add-dialog'

export interface WalletAddSelectProps {
  onSelect: (type: WalletAddType) => void
}

export function WalletAddDialog({ onSelect }: WalletAddSelectProps) {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    }
  }

  function handleSelect(option: WalletAddType) {
    onSelect(option)
    handleToggle()
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open)
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }

    prevOpen.current = open
  }, [open])

  return (
    <>
      <IconButton
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <AddIcon />
      </IconButton>
      <Popper open={open} anchorEl={anchorRef.current} placement="bottom-end" role={undefined} transition>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <MenuItem button onClick={() => handleSelect('create')}>
                    <Avatar className="mr-2">
                      <AddIcon />
                    </Avatar>
                    Create new account
                  </MenuItem>
                  <MenuItem button onClick={() => handleSelect('import')}>
                    <Avatar className="mr-2">
                      <SystemUpdateAltIcon />
                    </Avatar>
                    Import existing account
                  </MenuItem>
                  <MenuItem button onClick={() => handleSelect('watch')}>
                    <Avatar className="mr-2">
                      <VisibilityIcon />
                    </Avatar>
                    Watch account
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}
