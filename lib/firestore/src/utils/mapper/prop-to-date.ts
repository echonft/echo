import dayjs, { Dayjs } from 'dayjs'
import { allPass, complement, has, ifElse, isNil, pipe, prop } from 'ramda'

export const propToDate = <T = Dayjs | undefined>(key: string) =>
  ifElse(
    allPass([has(key), pipe(prop(key), complement(isNil))]),
    pipe(prop<number>(key), (date) => Promise.resolve(dayjs(date) as T)),
    () => Promise.resolve(undefined as T)
  )
