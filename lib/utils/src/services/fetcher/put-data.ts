import { FetcherData } from '../../types/fetcher-data'
import { jsonContentTypeRequestInit } from './request-init/json-content-type-request-init'
import { setBody } from './request-init/set-body'
import { setMethod } from './request-init/set-method'
import { pipe } from 'ramda'

export const putData = async <T, D extends FetcherData = undefined>(url: URL, data?: D): Promise<T> => {
  const response = await fetch(url, pipe(setMethod('PUT'), setBody(data))(jsonContentTypeRequestInit))
  return (await response.json()) as T
}
