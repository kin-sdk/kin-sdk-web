import { getPrices, Prices } from '@kin-sdk/client'

export class CorePrices {
  prices: Prices

  load(): Promise<boolean> {
    return getPrices()
      .then((prices) => (this.prices = prices))
      .then(() => true)
  }
}
