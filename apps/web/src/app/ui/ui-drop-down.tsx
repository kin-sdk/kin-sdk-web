import React from 'react';
import { BiBookAdd, BiMoney } from 'react-icons/bi'
import { ReactNode } from 'react'

export interface UiDropDownProps {
    children: ReactNode
}

export function UiDropDown(props: UiDropDownProps) {
  return (
     <>
    <div className="relative inline-block text-left">
        <div>
    <button type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="options-menu" aria-expanded="true" aria-haspopup="true">
      Drop Down here
    </button>
  </div>

  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
    <div className="py-1" role="none">
      <a href="#" className="group flex items-center px-4 py-2 text-xl text-primary hover:bg-gray-100 hover:text-gray-900 hover:font-bold" role="menuitem">
        <BiBookAdd className="text-xl mx-1"/>
        Account 1
      </a>
      <a href="#" className="group flex items-center px-4 py-2 text-xl text-primary hover:bg-gray-100 hover:text-gray-900 hover:font-bold" role="menuitem">
         <BiMoney className="text-xl mx-1"/>
        Account 2
      </a>
    </div>
   
  </div>
</div>

     </>
  )
}
