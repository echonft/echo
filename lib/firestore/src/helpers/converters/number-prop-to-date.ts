import dayjs, { Dayjs } from 'dayjs'
import { assoc, has, ifElse, isNil, modify, unless } from 'ramda'

export const numberPropToDate = <K extends string>(prop: K) =>
  ifElse(
    has(prop),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modify<K, number | undefined, Dayjs | undefined>(prop, unless(isNil, dayjs.unix)),
    assoc(prop, undefined)
  )
