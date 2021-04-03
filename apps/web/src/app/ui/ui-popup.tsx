import React from 'react'

interface UiPopupProps {
  trigger?: any
  children?: any
  setTrigger: (value: boolean) => void
}

export function UiPopup(props: UiPopupProps) {
  return props.trigger ? (
    <>
      <div className="fixed top-4 w-full h-96 bg-yellow-300 flex items-center justify-center">
        <div className="relative p-8 w-full p-20 bg-yellow-700">
          <button className="absolute top-10 right-4 p-20" onClick={() => props.setTrigger(false)}>
            close
          </button>
          {props.children}
        </div>
      </div>
    </>
  ) : null
}
