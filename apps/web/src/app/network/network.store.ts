import { createStore, State } from '@mindspace-io/react-akita';

// Define store structure
interface StoreState extends State {
  bears: number;
  decreasePopulation: () => void;
  increasePopulation: () => void;
  removeAllBears: () => void;
}

const onBuildState = ({ set, get }) => {
  return {
    // Properties
    bears: 0,
    // Mutators
    decreasePopulation: () => set((state) => ({ bears: state.bears - 1 })),
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),

    // Computed Properties (none here)
    // Watch Properties (none here)
  };
};

// Build a React hook connected 'live' to the store state
export const useNetworkStore = createStore<StoreState>(onBuildState);
