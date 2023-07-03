import { castAs } from '../../fp/cast-as'
import { getJsonContentTypeRequestInit } from './request-init/get-json-content-type-request-init'
import { setMethod } from './request-init/set-method'
import { setSearchParams } from './url/set-search-params'
import { R } from '@mobily/ts-belt'
import { andThen, partialRight, pipe } from 'ramda'

export const getData = <T, D extends Record<string, string>>(url: string, data: D): Promise<R.Result<T, Error>> =>
  pipe(
    setSearchParams(data),
    partialRight(fetch, [pipe(getJsonContentTypeRequestInit, setMethod('GET'))()]),
    andThen((response) => response.json()),
    castAs,
    R.fromPromise<T>
  )(new URL(url))
