import { assoc, has, ifElse, isNil, modify, unless } from 'ramda'

export const stringPropToUrl = <K extends string>(prop: K) =>
  ifElse(
    has(prop),
    modify<K, string | undefined, URL | undefined>(
      prop,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      unless(isNil, (url: string) => new URL(url))
    ),
    assoc(prop, undefined)
  )
