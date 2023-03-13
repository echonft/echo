import { getJsonContentTypeRequestInit } from './request-init/get-json-content-type-request-init'
import { setAuthorization } from './request-init/set-authorization'
import { castAs } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { partialRight, pipe } from 'ramda'

export const getSecureUrl = <T>(url: string, authorization: string): Promise<R.Result<T, Error>> =>
  pipe(
    partialRight(fetch, [pipe(getJsonContentTypeRequestInit, setAuthorization(authorization))()]),
    castAs,
    R.fromPromise<T>
  )(url)
