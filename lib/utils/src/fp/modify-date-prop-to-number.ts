import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { dissoc, has, ifElse, invoker, isNil, modify, when } from 'ramda'

function internalFn<K extends keyof T, T>(propKey: K) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return when(has(propKey), ifElse(propIsNil(propKey), dissoc(propKey), modify(propKey, invoker(0, 'unix')))) as (
    obj: T
  ) => T | (T & Record<K, number>)
}

export function modifyDatePropToNumber<K extends keyof T, T>(propKey: K): (obj: T) => T | (T & Record<K, number>)
export function modifyDatePropToNumber<K extends keyof T, T>(propKey: K, obj: T): T | (T & Record<K, number>)
export function modifyDatePropToNumber<K extends keyof T, T>(
  propKey: K,
  obj?: T
): (T | (T & Record<K, number>)) | ((obj: T) => T | (T & Record<K, number>)) {
  if (isNil(obj)) {
    return internalFn<K, T>(propKey)
  }
  return internalFn<K, T>(propKey)(obj)
}
