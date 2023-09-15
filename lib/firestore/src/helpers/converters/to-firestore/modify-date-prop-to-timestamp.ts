import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { Dayjs } from 'dayjs'
import { Timestamp } from 'firebase-admin/firestore'
import { dissoc, has, ifElse, isNil, modify, when } from 'ramda'

export function internalFn<K extends keyof T, T>(propKey: K) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/unbound-method
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
      modify(propKey, (date: Dayjs) => Timestamp.fromDate(date.toDate()))
    )
  ) as (obj: T) => T & Record<K, Timestamp | undefined>
}

export function modifyDatePropToTimestamp<K extends keyof T, T>(
  propKey: K
): (obj: T) => T & Record<K, Timestamp | undefined>
export function modifyDatePropToTimestamp<K extends keyof T, T>(
  propKey: K,
  obj: T
): T & Record<K, Timestamp | undefined>
export function modifyDatePropToTimestamp<K extends keyof T, T>(
  propKey: K,
  obj?: T
): (T & Record<K, Timestamp | undefined>) | ((obj: T) => T & Record<K, Timestamp | undefined>) {
  if (isNil(obj)) {
    return internalFn<K, T>(propKey)
  }
  return internalFn<K, T>(propKey)(obj)
}
