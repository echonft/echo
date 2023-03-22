import { toPromise, undefinedPromise } from '@echo/utils'
import { allPass, complement, has, ifElse, isNil, pipe, prop } from 'ramda'

export const propToBigInt = <T = bigint | undefined>(key: string) =>
  ifElse<[unknown], Promise<T>, Promise<T>>(
    allPass([has(key), pipe(prop(key), complement(isNil))]),
    pipe(prop<string>(key), (value) => BigInt(value), toPromise<T>),
    undefinedPromise<T>
  )
