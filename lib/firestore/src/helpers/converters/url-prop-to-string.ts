import { assoc, has, ifElse, isNil, modify, prop, unless } from 'ramda'

export const urlPropToString = <K extends string>(propKey: K) =>
  ifElse(
    has(propKey),
    modify<K, URL | undefined, string | undefined>(
      propKey,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      unless(isNil, prop('href'))
    ),
    assoc(propKey, undefined)
  )
