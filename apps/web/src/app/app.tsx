import React from 'react';
import { AppShell } from './app-shell';
import { UiContainer } from './ui/ui-container';
import { UiHeader } from './ui/ui-header';

export function App() {
  return (
    <div className={'dark:bg-gray-700 dark:text-gray-300 min-h-screen'}>
      <UiHeader />
      <UiContainer>
        <AppShell />
      </UiContainer>
    </div>
  );
}
