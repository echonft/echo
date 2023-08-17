import { Dayjs } from 'dayjs'
import { assoc, has, ifElse, invoker, isNil, modify, unless } from 'ramda'

export const datePropToNumber = <K extends string>(prop: K) =>
  ifElse(
    has(prop),
    modify<K, Dayjs | undefined, number | undefined>(prop, unless(isNil, invoker(0, 'unix'))),
    assoc(prop, undefined)
  )
