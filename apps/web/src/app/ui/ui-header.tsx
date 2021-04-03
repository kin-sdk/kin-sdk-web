import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup'
import { UiPopup } from './ui-popup';
import { UiDropDown }from './ui-drop-down';

interface UiHeaderProps{
  children?: any
}

const contentStyle = { width: '100%', 
background: 'transparent', 
border: 'none', 
padding: '0',}

export function UiHeader() {

const [ menuOpen, setMenuOpen] = useState<boolean>(false)
const [ buttonPopup, setButtonPopup] = useState<boolean>(false)

// const modalHandler = {
//   open: (args: string) => setModals((prevstate) => prevstate.concat(args)),
//   close: (args: string) => setModals((prevstate) => prevstate.filter((el) => el != args)),
//   }
//   return [openModals, modalHandler] as const
// }

// console.log(setTrigger, "Este es el Triguer");

const toggleMenu = () => setMenuOpen(() => !menuOpen)
  
  return (
    <>
    <header className="flex justify-between items-center shadow-lg px-6 py-4 bg-indigo-700 text-indigo-100">
      <h1 className="text-xl font-semibold">
        <Link to="/">Kin Wallet</Link>
      </h1>
      <div className="flex space-x-3 uppercase text-base">
        <span>
          <Link to="/accounts">Account</Link>
        </span>
        <span>Mainnet</span>
      </div>
      <UiDropDown>Prueba</UiDropDown>
      <UiPopup setTrigger={setButtonPopup} trigger={buttonPopup}>
        <h3>Componet Here</h3>
        <p onClick={toggleMenu}>This is my button</p>
      </UiPopup>
      <button onClick={() => setButtonPopup(true)}>Open popUp</button>
      {/* pensando en ponerle  setTrigger={setButtonPopup} */}
    </header>
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
        <hr/>
          <h1>Hola</h1>
      </div>
    </Popup>
    </>
  );
}
