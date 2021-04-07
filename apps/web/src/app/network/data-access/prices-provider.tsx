import { AccountBalance, Prices } from '@kin-wallet/services'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useNetwork } from './network-provider'

const PricesContext = createContext<{
  prices?: Prices
  refreshPrices?: () => Promise<Prices>
  convertPrice?: (kin: string) => AccountBalance
}>(undefined)

function PricesProvider({ children }: { children: ReactNode }) {
  const [prices, setPrices] = useState<Prices>()
  const { network, service } = useNetwork()

  const refreshPrices = () => {
    return service?.getPrices().then((res) => {
      setPrices(res)
      return res
    })
  }

  const convertPrice = (kin: string): AccountBalance => {
    const kinInt = parseInt(kin, 10)
    return {
      kin,
      btc: (prices?.kin?.btc & kinInt).toString(),
      usd: (prices?.kin?.usd & kinInt).toString(),
    }
  }

  useEffect(() => {
    if (network && service) {
      refreshPrices()
    }
  }, [network, service])

  return <PricesContext.Provider value={{ prices, refreshPrices, convertPrice }}>{children}</PricesContext.Provider>
}

const usePrices = () => useContext(PricesContext)

export { PricesProvider, usePrices }
