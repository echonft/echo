import { Dayjs } from 'dayjs'
import { invoker, modify } from 'ramda'

export const datePropToNumber = <K extends string>(prop: K) => modify<K, Dayjs, number>(prop, invoker(0, 'unix'))
