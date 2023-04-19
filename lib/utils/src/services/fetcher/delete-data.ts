import { castAs } from '../../fp/cast-as'
import { getJsonContentTypeRequestInit } from './request-init/get-json-content-type-request-init'
import { setBody } from './request-init/set-body'
import { setMethod } from './request-init/set-method'
import { R } from '@mobily/ts-belt'
import { andThen, partialRight, pipe } from 'ramda'

export const deleteData = <T, D extends object>(url: string, data: D): Promise<R.Result<T, Error>> =>
  pipe(
    partialRight(fetch, [pipe(getJsonContentTypeRequestInit, setBody(data), setMethod('DELETE'))()]),
    andThen((response) => response.json()),
    castAs,
    R.fromPromise<T>
  )(url)
