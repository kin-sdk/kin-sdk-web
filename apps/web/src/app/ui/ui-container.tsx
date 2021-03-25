import React from 'react';

export function UiContainer(props) {
  return (
    <div className="max-w-5xl md:max-w-2xl mx-auto py-3 md:py-6 lg:py-12 px-3 md:px-6 lg:px-8 h-full">
      {props.children}
    </div>
  );
}
