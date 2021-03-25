import React from 'react';
import { useNetworkStore } from '../network/network.store';
import { UiCard, UiCardHeader } from '../ui/ui-card';
import { WalletList } from './wallet-list';

export function WebWalletFeature() {
  // const network = useNetworkStore((s) => s.bears);

  const selector = [
    (state) => state.bears,
    (state) => state.increasePopulation,
  ];
  const [bears, increasePopulation] = useNetworkStore(selector);

  // console.log(network.bears);
  return (
    <UiCard>
      <UiCardHeader>
        <h2 className="font-semibold text-lg">
          Main account Balances ($27.05)
        </h2>
      </UiCardHeader>
      <WalletList />
      {/*<button onClick={() => network.increasePopulation()}>Up</button>*/}
      {/*<button onClick={() => network.decreasePopulation()}>Down</button>*/}
      {/*<button onClick={() => network.removeAllBears()}>Reset</button>*/}
      {/*<pre>network.bears: {network}</pre>*/}
    </UiCard>
  );
}
