import React, { useState } from 'react';
import { UiLogo } from '../ui/ui-logo';
interface Wallet {
  id?: string;
  name?: string;
  seed?: string;
  publicKey?: string;
}

export function WalletList() {
  const wallets: Wallet[] = [
    {
      id: 'w',
      name: 'Account 1',
      seed: 'x',
      publicKey: 'B33hx7NmZXRiC5Rg2Er7pqdNeKLEm7a7uD8tt9zKG4pk',
    },
    {
      id: 'w',
      name: 'Account 2',
      seed: 'x',
      publicKey: 'B33hx7NmZXRiC5Rg2Er7pqdNeKLEm7a7uD8tt9zKG4pk',
    },
    {
      id: 'w',
      name: 'Account 3',
      seed: 'x',
      publicKey: 'B33hx7NmZXRiC5Rg2Er7pqdNeKLEm7a7uD8tt9zKG4pk',
    },
  ];
  return (
    <div>
      {wallets.map((wallet) => (
        <WalletListItem key={wallet.id} wallet={wallet} />
      ))}
    </div>
  );
}

export function WalletListItem({ wallet }: { wallet: Wallet }) {
  const [showDetails, setShowDetails] = useState(false);
  const [tokenName] = useState('KIN');
  const [tokenSymbol] = useState('KIN');
  const toggleDetails = () => setShowDetails(!showDetails);
  return (
    <div>
      <div
        className="px-6 py-4 hover:bg-gray-700 cursor-pointer"
        onClick={toggleDetails}
      >
        <div className="flex justify-between items-center">
          <div className="flex justify-between items-center space-x-2">
            <span>
              <UiLogo />
            </span>
            <div>
              <div className="text-gray-100">
                150.000 {tokenName} ({tokenSymbol})
              </div>
              <div className="text-xs text-gray-400">{wallet.publicKey}</div>
            </div>
          </div>
          <div className="flex justify-between items-center space-x-2">
            <span>$27.05</span>
            <span>
              <button onClick={toggleDetails}>^</button>
            </span>
          </div>
        </div>
      </div>
      {showDetails ? (
        <div className="px-6 py-4">
          <div className="flex justify-evenly">
            <div className="px-4 py-2 rounded border border-indigo-400 text-indigo-400">
              Receive
            </div>
            <div className="px-4 py-2 rounded border border-indigo-400 text-indigo-400">
              Send
            </div>
          </div>
          <div className="text-sm">
            <div>Token Name: {tokenName}</div>
            <div>Token Symbol: {tokenSymbol}</div>
            <div className="flex justify-between">
              <a href="" className="text-indigo-400">
                View on Solana
              </a>
              <a href="" className="text-indigo-400">
                Export
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
