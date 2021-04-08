import BigNumber from 'bignumber.js'
import * as bs58 from 'bs58'

// kinToQuarks converts a string representation of kin
// to the quark value.
//
// If the provided kin amount contains more than 5 decimal
// places (i.e. an inexact number of quarks), additional
// decimal places will be ignored.
//
// For example, passing in a value of "0.000009" will result
// in a value of 0 quarks being returned.
//
export function kinToQuarks(amount: string): BigNumber {
  const b = new BigNumber(amount).decimalPlaces(5, BigNumber.ROUND_DOWN)
  return b.multipliedBy(1e5)
}

export function quarksToKin(amount: BigNumber | string): string {
  return new BigNumber(amount).dividedBy(1e5).toString()
}

export function elipsify(str = '', len = 10) {
  if (str.length > 30) {
    return str.substr(0, len) + '...' + str.substr(str.length - len, str.length)
  }
  return str
}

export function bs58decode(string: string): Buffer | undefined {
  return bs58.decode(string)
}

export function bs58encode(buffer: Buffer | number[] | Uint8Array): string {
  return bs58.encode(buffer)
}
