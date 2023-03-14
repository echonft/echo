import { undefinedPromise } from '@echo/utils'
import { BigNumber } from 'ethers'
import { allPass, complement, has, ifElse, isNil, pipe, prop } from 'ramda'

export const propToBigNumber = <T = BigNumber | undefined>(key: string) =>
  ifElse<[unknown], Promise<T>, Promise<T>>(
    allPass([has(key), pipe(prop(key), complement(isNil))]),
    pipe(prop<string>(key), (hexValue) => Promise.resolve(BigNumber.from(hexValue) as T)),
    undefinedPromise<T>
  )
