import { castAs } from '../../fp'
import { getFormContentTypeRequestInit } from './request-init/get-form-content-type-request-init'
import { setBody } from './request-init/set-body'
import { setMethod } from './request-init/set-method'
import { R } from '@mobily/ts-belt'
import { partialRight, pipe } from 'ramda'

export const postFormData = <T, D extends object>(url: string, data: D): Promise<R.Result<T, Error>> =>
  pipe(
    partialRight(fetch, [pipe(getFormContentTypeRequestInit, setBody(data), setMethod('POST'))()]),
    castAs,
    R.fromPromise<T>
  )(url)
