import React from 'react';
import { Link, Route } from 'react-router-dom';
import { UiCard } from './ui/ui-card';
import { WebWalletFeature } from './wallet/web-wallet-feature';

export function AppShell() {
  return (
    <>
      <Route path="/" exact render={WebWalletFeature} />
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
