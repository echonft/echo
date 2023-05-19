import { undefinedPromise } from '@echo/utils'
import dayjs from 'dayjs'
import { allPass, complement, has, ifElse, isNil, pipe, prop } from 'ramda'

export const propToDate = <T = dayjs.Dayjs | undefined>(key: string) =>
  ifElse<[unknown], Promise<T>, Promise<T>>(
    allPass([has(key), pipe(prop(key), complement(isNil))]),
    pipe(prop<number>(key), (date) => Promise.resolve(dayjs(date) as T)),
    undefinedPromise<T>
  )
