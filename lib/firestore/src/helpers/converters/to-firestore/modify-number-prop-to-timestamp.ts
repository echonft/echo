import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { Timestamp } from 'firebase-admin/firestore'
import { bind, dissoc, has, ifElse, isNil, modify, when } from 'ramda'

// eslint-disable-next-line @typescript-eslint/unbound-method
const boundFromMillis = bind(Timestamp.fromMillis, Timestamp)

export function internalFn<K extends keyof T, T>(propKey: K) {
  return when(
    has(propKey),
    ifElse(
      propIsNil(propKey),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dissoc(propKey),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      modify(propKey, boundFromMillis)
    )
  ) as (obj: T) => Omit<T, K> & Record<K, Timestamp | undefined>
}

export function modifyNumberPropToTimestamp<K extends keyof T, T>(
  propKey: K
): (obj: T) => Omit<T, K> & Record<K, Timestamp | undefined>
export function modifyNumberPropToTimestamp<K extends keyof T, T>(
  propKey: K,
  obj: T
): Omit<T, K> & Record<K, Timestamp | undefined>
export function modifyNumberPropToTimestamp<K extends keyof T, T>(
  propKey: K,
  obj?: T
): (Omit<T, K> & Record<K, Timestamp | undefined>) | ((obj: T) => Omit<T, K> & Record<K, Timestamp | undefined>) {
  if (isNil(obj)) {
    return internalFn<K, T>(propKey)
  }
  return internalFn<K, T>(propKey)(obj)
}
