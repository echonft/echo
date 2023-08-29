import { getAddress } from 'ethers'
import { assoc, has, ifElse, isNil, modify, pipe, prop, unless } from 'ramda'

export const modifyStringPropToAddress = <K extends string, T>(propKey: K) =>
  ifElse(
    has(propKey),
    unless(
      pipe(prop(propKey), isNil),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      modify(propKey, getAddress)
    ),
    assoc(propKey, undefined)
  ) as (obj: T) => T & Record<K, string | undefined>
