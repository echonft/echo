import { allPass, complement, has, ifElse, isNil, pipe, prop } from 'ramda'

export const propToUrl = <T = URL | undefined>(key: string) =>
  ifElse(
    allPass([has(key), pipe(prop(key), complement(isNil))]),
    pipe(prop<string>(key), (url: string) => Promise.resolve(new URL(url) as T)),
    () => Promise.resolve(undefined as T)
  )
