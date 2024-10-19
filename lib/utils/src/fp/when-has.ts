import { propIsNotNil } from '@echo/utils/fp/prop-is-not-nil'
import { both, has, isNil } from 'ramda'

type WhenTrue<K extends keyof T, T, U> = (obj: Omit<T, K> & Record<K, NonNullable<Required<T>[K]>>) => U
type ReturnFn<K extends keyof T, T, U> = (obj: Omit<T, K> & Partial<Pick<T, K>>) => T | U

function internalFn<K extends keyof T, T, U>(key: K, whenTrue: WhenTrue<K, T, U>): ReturnFn<K, T, U> {
  return function (obj: Omit<T, K> & Partial<Pick<T, K>>): T | U {
    if (both(has(key), propIsNotNil(key))(obj)) {
      return whenTrue(obj as Omit<T, K> & Record<K, NonNullable<Required<T>[K]>>)
    }
    return obj
  }
}

export function whenHas<K extends keyof T, T, U>(key: K, whenTrue: WhenTrue<K, T, U>): ReturnFn<K, T, U>
export function whenHas<K extends keyof T, T, U>(key: K, whenTrue: WhenTrue<K, T, U>, obj: T): T | U
export function whenHas<K extends keyof T, T, U>(
  key: K,
  whenTrue: WhenTrue<K, T, U>,
  obj?: T
): ReturnFn<K, T, U> | (T | U) {
  if (isNil(obj)) {
    return internalFn<K, T, U>(key, whenTrue)
  }
  return internalFn<K, T, U>(key, whenTrue)(obj)
}
