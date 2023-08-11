import { undefinedPromise } from '@echo/utils'
import { allPass, has, ifElse, isNotNil, pipe, prop } from 'ramda'

export const propToUrl = <T = URL | undefined>(key: string) =>
  ifElse<[unknown], Promise<T>, Promise<T>>(
    allPass([has(key), pipe(prop(key), isNotNil)]),
    pipe(prop<string>(key), (url: string) => Promise.resolve(new URL(url) as T)),
    undefinedPromise<T>
  )
