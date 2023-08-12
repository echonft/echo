import { undefinedPromise } from '@echo/utils'
import dayjs from 'dayjs'
import { allPass, has, ifElse, isNotNil, pipe, prop } from 'ramda'

export const propToDate = <T = dayjs.Dayjs | undefined>(key: string) =>
  ifElse<[unknown], Promise<T>, Promise<T>>(
    allPass([has(key), pipe(prop(key), isNotNil)]),
    pipe(prop<number>(key), (date) => Promise.resolve(dayjs.unix(date) as T)),
    undefinedPromise<T>
  )
