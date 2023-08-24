import { isNil, pipe, prop, unless } from 'ramda'

export const stringPropToUrl = <K extends string>(propKey: K) =>
  pipe(
    prop(propKey),
    unless(isNil, (url: string) => new URL(url))
  )
