import React, { ReactNode, useState } from 'react'
import { BiCog, BiGlobe, BiLoader } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import Popup from 'reactjs-popup'
import { NetworkDropdown } from '../network-select/network-dropdown'
import { useNetwork } from '../network-select/network.hook'

interface UiHeaderProps {
  children?: ReactNode
}

const contentStyle = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  padding: '0',
}

export function UiHeader({ children }: UiHeaderProps) {
  const { networks, network, setNetwork } = useNetwork()
  const [buttonPopup, setButtonPopup] = useState<boolean>(false)

  return (
    <>
      <header className="flex justify-between items-center shadow-lg px-6 py-2 bg-indigo-700 text-indigo-100">
        <h1 className="text-xl font-semibold">
          <Link to="/">Kin Wallet</Link>
        </h1>
        <div className="flex items-center space-x-3 uppercase text-base">
          {/*<Link to="/accounts">*/}
          {/*  <div className="inline-flex justify-center w-full rounded-md shadow-sm px-2 py-2 border-indigo-200 font-medium text-indigo-200 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-100 focus:ring-indigo-500 flex items-center space-x-2">*/}
          {/*    <BiCog className="text-xl" />*/}
          {/*  </div>*/}
          {/*</Link>*/}
          <NetworkDropdown networks={networks} selected={network} onSelect={setNetwork} />
        </div>
      </header>
      {/* pensando en ponerle  setTrigger={setButtonPopup} */}
      {/*<UiPopup setTrigger={setButtonPopup} trigger={buttonPopup}>*/}
      {/*  <h3>Componet Here</h3>*/}
      {/*  <p onClick={toggleMenu}>This is my button</p>*/}
      {/*</UiPopup>*/}
      {/*<button onClick={() => setButtonPopup(true)}>Open popUp</button>*/}
      <Popup
        open={buttonPopup}
        //setTrigger={setButtonPopup}
        onClose={() => setButtonPopup(false)}
        contentStyle={contentStyle}
        lockScroll={true}
        closeOnDocumentClick
        nested
        modal
      >
        <div>
          <hr />
          <h1>Hola</h1>
        </div>
      </Popup>
    </>
  )
}
