import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { dissoc, has, ifElse, modify, when } from 'ramda'

export function modifyStringPropToUrl<K extends keyof T, T>(propKey: K) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return when(
    has(propKey),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ifElse(
      propIsNil(propKey),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dissoc(propKey),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      modify(propKey, (url: string) => new URL(url))
    )
  ) as (obj: T) => T & Record<K, URL | undefined>
}
