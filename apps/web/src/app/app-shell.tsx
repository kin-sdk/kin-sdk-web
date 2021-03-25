import React from 'react';
import { Link, Route } from 'react-router-dom';
import { UiCard, UiCardBody, UiCardHeader } from './ui/ui-card';
import { WalletList } from './wallet/wallet-list';

export function AppShell() {
  return (
    <>
      <Route
        path="/"
        exact
        render={() => (
          <UiCard>
            <UiCardHeader>
              <h2 className="font-semibold text-lg">
                Main account Balances ($27.05)
              </h2>
            </UiCardHeader>
            <WalletList />
          </UiCard>
        )}
      />
      <Route
        path="/accounts"
        exact
        render={() => (
          <UiCard>
            <h2>ACCOUNTS</h2>
            <Link to="/">Click here to go back to root page.</Link>
          </UiCard>
        )}
      />
    </>
  );
}
