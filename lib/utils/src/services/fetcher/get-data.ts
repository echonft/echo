import { FetcherData } from '../../types/fetcher-data'
import { getJsonContentTypeRequestInit } from './request-init/get-json-content-type-request-init'
import { setMethod } from './request-init/set-method'
import { setSearchParams } from './url/set-search-params'
import { andThen, partialRight, pipe } from 'ramda'

export const getData = <T, D extends FetcherData>(url: string, data: D): Promise<T> =>
  pipe(
    setSearchParams(data),
    partialRight(fetch, [pipe(getJsonContentTypeRequestInit, setMethod('GET'))()]),
    andThen((response) => response.json() as T)
  )(new URL(url))
