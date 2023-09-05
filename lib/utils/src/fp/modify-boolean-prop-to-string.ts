import { propIsNil } from './prop-is-nil'
import { always, dissoc, has, ifElse, isNil, modify, when } from 'ramda'

function internalFn<K extends keyof T, T>(propKey: K): (obj: T) => T | (T & Record<K, string>) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return when(
    has(propKey),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ifElse(propIsNil(propKey), dissoc(propKey), modify(propKey, ifElse(Boolean, always('true'), always('false'))))
  )
}

export function modifyBooleanPropToString<K extends keyof T, T>(propKey: K, obj: T): T | (T & Record<K, string>)
export function modifyBooleanPropToString<K extends keyof T, T>(propKey: K): (obj: T) => T | (T & Record<K, string>)
export function modifyBooleanPropToString<K extends keyof T, T>(
  propKey: K,
  obj?: T
): (T | (T & Record<K, string>)) | ((obj: T) => T | (T & Record<K, string>)) {
  if (isNil(obj)) {
    return internalFn<K, T>(propKey)
  }
  return internalFn<K, T>(propKey)(obj)
}
