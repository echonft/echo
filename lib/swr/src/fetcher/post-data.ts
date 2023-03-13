import { getJsonContentTypeRequestInit } from './request-init/get-json-content-type-request-init'
import { setBody } from './request-init/set-body'
import { setMethod } from './request-init/set-method'
import { castAs } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { partialRight, pipe } from 'ramda'

export const postData = <T, D extends Record<string, unknown>>(url: string, data: D): Promise<R.Result<T, Error>> =>
  pipe(
    partialRight(fetch, [pipe(getJsonContentTypeRequestInit, setBody(data), setMethod('POST'))()]),
    castAs,
    R.fromPromise<T>
  )(url)
