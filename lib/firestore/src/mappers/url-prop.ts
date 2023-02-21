import { has, ifElse, pipe, prop } from 'ramda'

export const urlProp = (key: string) =>
  ifElse(
    has(key),
    pipe(prop<string>(key), (url: string) => Promise.resolve(new URL(url))),
    () => Promise.resolve(undefined)
  )
