import { undefinedPromise } from '@echo/utils'
import { Dayjs, unix } from 'dayjs'
import { allPass, complement, has, ifElse, isNil, pipe, prop } from 'ramda'

export const propToDate = <T = Dayjs | undefined>(key: string) =>
  ifElse<[unknown], Promise<T>, Promise<T>>(
    allPass([has(key), pipe(prop(key), complement(isNil))]),
    pipe(prop<number>(key), (date) => Promise.resolve(unix(date) as T)),
    undefinedPromise<T>
  )
