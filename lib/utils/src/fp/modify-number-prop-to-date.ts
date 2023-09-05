import { propIsNil } from './prop-is-nil'
import dayjs from 'dayjs'
import { dissoc, has, ifElse, invoker, modify, pipe, prop, when } from 'ramda'

export const modifyNumberPropToDate = <K extends keyof T, T>(propKey: K) =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  when(
    has(propKey),
    ifElse(
      propIsNil(propKey),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dissoc(propKey),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ifElse(pipe(prop(propKey), dayjs, invoker(0, 'isValid')), modify(propKey, dayjs.unix), () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw Error(`prop ${propKey} is not a valid unix time`)
      })
    )
  ) as (obj: T) => T & Record<K, dayjs.Dayjs | undefined>
