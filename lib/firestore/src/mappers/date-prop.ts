import dayjs from 'dayjs'
import { has, ifElse, pipe, prop } from 'ramda'

export const dateProp = (key: string) =>
  ifElse(
    has(key),
    pipe(prop<number>(key), (date) => Promise.resolve(dayjs(date))),
    () => Promise.resolve(undefined)
  )
