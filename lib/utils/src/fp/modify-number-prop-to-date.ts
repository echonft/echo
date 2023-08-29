import dayjs, { Dayjs } from 'dayjs'
import { assoc, has, ifElse, invoker, isNil, modify, pipe, prop, unless } from 'ramda'

export const modifyNumberPropToDate = <K extends string, T>(propKey: K) =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ifElse(
    has(propKey),
    unless(
      pipe(prop(propKey), isNil),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ifElse(pipe(prop(propKey), dayjs, invoker(0, 'isValid')), modify(propKey, dayjs.unix), () => {
        throw Error(`prop ${propKey} is not a valid unix time`)
      })
    ),
    assoc(propKey, undefined)
  ) as (obj: T) => T & Record<K, Dayjs | undefined>
