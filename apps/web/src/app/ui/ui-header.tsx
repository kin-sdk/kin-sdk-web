import React, { ReactNode, useState } from 'react'
import { Link } from 'react-router-dom'
import Popup from 'reactjs-popup'

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
  const [buttonPopup, setButtonPopup] = useState<boolean>(false)

  return (
    <>
      <header className="flex justify-between items-center shadow-lg px-6 py-2 bg-indigo-700 text-indigo-100">
        <h1 className="text-xl font-semibold">
          <Link to="/">Kin Wallet</Link>
        </h1>
        <div className="flex items-center space-x-3 uppercase text-base">{children}</div>
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
