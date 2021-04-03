import React from 'react';
import { ReactNode } from 'react';
import {BiRefresh, BiMenuAltLeft } from 'react-icons/bi'

interface UiHeaderCardProps{ 
    title: string
    icons: ReactNode[]
 }

export function UiHeaderCard(props: UiHeaderCardProps) {

  return (
    <div className="bg-gray-800 max-w-5xl md:max-w-2xl mx-auto py-3 md:py-6 lg:py-12 px-3 md:px-6 lg:px-8 h-full">
      <div className="flex justify-between">
        <h2 className="flex-grow font-semibold text-lg">{props.title}</h2>
              <div className="flex justify-evenly">
                <BiMenuAltLeft className="text-3xl stroke-0 hover:bg-primary-400 rounded-full w-10"/>
                <BiRefresh className="text-3xl stroke-0 hover:bg-primary-400 rounded-full w-10"/>
              </div>
        </div>
    </div>
  );
}
