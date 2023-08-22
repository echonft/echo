import { getJsonContentTypeRequestInit } from './request-init/get-json-content-type-request-init'
import { setBody } from './request-init/set-body'
import { setMethod } from './request-init/set-method'
import { andThen, partialRight, pipe } from 'ramda'

export const postData = <T, D extends object>(url: URL, data: D): Promise<T> =>
  pipe(
    partialRight(fetch, [pipe(getJsonContentTypeRequestInit, setBody(data), setMethod('POST'))()]),
    andThen((response) => response.json() as T)
  )(url)
