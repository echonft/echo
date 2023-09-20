import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { dissoc, has, ifElse, isNil, modify, when } from 'ramda'
import { getAddress } from 'viem'

function internalFn<K extends keyof T, T>(propKey: K) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return when(has(propKey), ifElse(propIsNil(propKey), dissoc(propKey), modify(propKey, getAddress))) as (
    obj: T
  ) => T & Record<K, string | undefined>
}

export function modifyStringPropToAddress<K extends keyof T, T>(
  propKey: K
): (obj: T) => T & Record<K, string | undefined>
export function modifyStringPropToAddress<K extends keyof T, T>(propKey: K, obj: T): T & Record<K, string | undefined>
export function modifyStringPropToAddress<K extends keyof T, T>(
  propKey: K,
  obj?: T
): ((obj: T) => T & Record<K, string | undefined>) | (T & Record<K, string | undefined>) {
  if (isNil(obj)) {
    return internalFn<K, T>(propKey)
  }
  return internalFn<K, T>(propKey)(obj)
}
