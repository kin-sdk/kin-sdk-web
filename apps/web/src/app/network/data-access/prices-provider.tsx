import { Prices } from '@kin-wallet/services'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useNetwork } from './network-provider'

const PricesContext = createContext<{
  prices?: Prices
  refreshPrices?: () => Promise<Prices>
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

  useEffect(() => {
    if (network && service) {
      refreshPrices()
    }
  }, [network, service])

  return <PricesContext.Provider value={{ prices, refreshPrices }}>{children}</PricesContext.Provider>
}

const usePrices = () => useContext(PricesContext)

export { PricesProvider, usePrices }
