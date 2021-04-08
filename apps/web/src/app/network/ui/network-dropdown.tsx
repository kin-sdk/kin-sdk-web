import { Network } from '@kin-sdk/services'
import { Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import React, { useEffect, useRef, useState } from 'react'
import { BiGlobe } from 'react-icons/bi'

export interface NetworkSelectProps {
  networks?: Network[]
  selected?: Network
  onSelect?: (network: Network) => void
}

function NetworkLabel({ title }: { title: string }) {
  return (
    <div className={'flex items-center space-x-2'}>
      <BiGlobe className="text-xl" />
      <span className="">{title || 'Loading'}</span>
    </div>
  )
}
export function NetworkDropdown({ selected, networks, onSelect }: NetworkSelectProps) {
  const [open, setOpen] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
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

  function handleSelect(network) {
    onSelect(network)
    enqueueSnackbar(`Selected network ${network.name}`, { variant: 'info' })
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
      <Button
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        disableFocusRipple
      >
        <NetworkLabel title={selected?.name} />
      </Button>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  {networks.map((network) => (
                    <MenuItem key={network.id} onClick={() => handleSelect(network)}>
                      <NetworkLabel title={network.name} />
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}
