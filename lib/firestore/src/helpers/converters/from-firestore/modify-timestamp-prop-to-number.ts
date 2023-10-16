import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { dissoc, has, ifElse, invoker, isNil, modify, when } from 'ramda'

export function internalFn<K extends keyof T, T>(propKey: K) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return when(
    has(propKey),
    ifElse(
      propIsNil(propKey),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dissoc(propKey),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      modify(propKey, invoker(0, 'toMillis'))
    )
  ) as (obj: T) => Omit<T, K> & Record<K, number | undefined>
}

export function modifyTimestampPropToNumber<K extends keyof T, T>(
  propKey: K
): (obj: T) => Omit<T, K> & Record<K, number | undefined>
export function modifyTimestampPropToNumber<K extends keyof T, T>(
  propKey: K,
  obj: T
): Omit<T, K> & Record<K, number | undefined>
export function modifyTimestampPropToNumber<K extends keyof T, T>(
  propKey: K,
  obj?: T
): (Omit<T, K> & Record<K, number | undefined>) | ((obj: T) => Omit<T, K> & Record<K, number | undefined>) {
  if (isNil(obj)) {
    return internalFn<K, T>(propKey)
  }
  return internalFn<K, T>(propKey)(obj)
}
