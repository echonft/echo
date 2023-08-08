import { getFormContentTypeRequestInit } from './request-init/get-form-content-type-request-init'
import { setBody } from './request-init/set-body'
import { setMethod } from './request-init/set-method'
import { partialRight, pipe } from 'ramda'

export const postFormData = <T, D extends object>(url: string, data: D): Promise<T> =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  pipe(partialRight(fetch, [pipe(getFormContentTypeRequestInit, setBody(data), setMethod('POST'))()]))(url)
