import { BigNumber } from 'ethers'
import { allPass, complement, has, ifElse, isNil, pipe, prop } from 'ramda'

export const propToBigNumber = <T = BigNumber | undefined>(key: string) =>
  ifElse(
    allPass([has(key), pipe(prop(key), complement(isNil))]),
    pipe(prop<string>(key), (hexValue) => Promise.resolve(BigNumber.from(hexValue) as T)),
    () => Promise.resolve(undefined as T)
  )
