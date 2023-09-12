import { propIsNil } from '@echo-utils/fp/prop-is-nil'
import { dissoc, has, ifElse, modify, prop, when } from 'ramda'

export function modifyUrlPropToString<K extends keyof T, T>(propKey: K) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return when(has(propKey), ifElse(propIsNil(propKey), dissoc(propKey), modify(propKey, prop('href')))) as (
    obj: T
  ) => T | (T & Record<K, string>)
}
