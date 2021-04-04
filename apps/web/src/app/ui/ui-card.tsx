import React from 'react'

export function UiCard(props) {
  return <div className="bg-gray-600 border border-gray-800 overflow-hidden rounded-lg shadow-lg">{props.children}</div>
}

export function UiCardHeader(props) {
  return <div className="bg-gray-800 px-6 py-4">{props.children}</div>
}

export function UiCardBody(props) {
  return <div className="p-4">{props.children}</div>
}
