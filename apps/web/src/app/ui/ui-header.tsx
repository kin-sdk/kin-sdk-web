import React from 'react';
import { Link } from 'react-router-dom';

export function UiHeader() {
  return (
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
    </header>
  );
}
