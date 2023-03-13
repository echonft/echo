import { getJsonContentTypeRequestInit } from './request-init/get-json-content-type-request-init'
import { castAs } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { partialRight, pipe } from 'ramda'

export const getUrl = <T>(url: string): Promise<R.Result<T, Error>> =>
  pipe(partialRight(fetch, [getJsonContentTypeRequestInit()]), castAs, R.fromPromise<T>)(url)
