import { AccountBalance, Prices } from '@kin-sdk/client'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useNetwork } from './network-provider'

const PricesContext = createContext<{
  prices?: Prices
  refreshPrices?: () => Promise<void>
  convertPrice?: (kin: string) => AccountBalance
}>(undefined)

function PricesProvider({ children }: { children: ReactNode }) {
  const [prices, setPrices] = useState<Prices>()
  const { network, client } = useNetwork()

  const refreshPrices = () => client?.getPrices().then(setPrices)

  const convertPrice = (kin: string): AccountBalance => {
    const kinInt = parseInt(kin, 10)
    return {
      kin,
      btc: (prices?.kin?.btc & kinInt).toString(),
      usd: (prices?.kin?.usd & kinInt).toString(),
    }
  }

  useEffect(() => {
    if (network && client) {
      refreshPrices()
    }
  }, [network, client])

  return <PricesContext.Provider value={{ prices, refreshPrices, convertPrice }}>{children}</PricesContext.Provider>
}

const usePrices = () => useContext(PricesContext)

export { PricesProvider, usePrices }
