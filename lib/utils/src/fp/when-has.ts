import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { isNil, unless } from 'ramda'

function internalFn<K extends keyof T, T, U>(
  key: K,
  whenTrue: (obj: T) => T & Record<K, U>
): (obj: T) => T | (T & Record<K, U>) {
  return function (obj: T) {
    return unless(propIsNil(key), whenTrue, obj)
  }
}

export function whenHas<K extends keyof T, T, U>(
  key: K,
  whenTrue: (obj: T) => T & Record<K, U>
): (obj: T) => T | (T & Record<K, U>)
export function whenHas<K extends keyof T, T, U>(
  key: K,
  whenTrue: (obj: T) => T & Record<K, U>,
  obj: T
): T & Record<K, U>
export function whenHas<K extends keyof T, T, U>(
  key: K,
  whenTrue: (obj: T) => T & Record<K, U>,
  obj?: T
): ((obj: T) => T | (T & Record<K, U>)) | (T | (T & Record<K, U>)) {
  if (isNil(obj)) {
    return internalFn<K, T, U>(key, whenTrue)
  }
  return internalFn<K, T, U>(key, whenTrue)(obj)
}
