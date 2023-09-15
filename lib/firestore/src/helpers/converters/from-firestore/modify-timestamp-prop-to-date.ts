import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import dayjs from 'dayjs'
import { dissoc, has, ifElse, invoker, isNil, modify, pipe, when } from 'ramda'

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
      modify(propKey, pipe(invoker(0, 'toMillis'), dayjs))
    )
  ) as (obj: T) => T & Record<K, dayjs.Dayjs | undefined>
}

export function modifyTimestampPropToDate<K extends keyof T, T>(
  propKey: K
): (obj: T) => T & Record<K, dayjs.Dayjs | undefined>
export function modifyTimestampPropToDate<K extends keyof T, T>(
  propKey: K,
  obj: T
): T & Record<K, dayjs.Dayjs | undefined>
export function modifyTimestampPropToDate<K extends keyof T, T>(
  propKey: K,
  obj?: T
): (T & Record<K, dayjs.Dayjs | undefined>) | ((obj: T) => T & Record<K, dayjs.Dayjs | undefined>) {
  if (isNil(obj)) {
    return internalFn<K, T>(propKey)
  }
  return internalFn<K, T>(propKey)(obj)
}
