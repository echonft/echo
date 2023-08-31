import { jsonContentTypeRequestInit } from './request-init/json-content-type-request-init'
import { setBody } from './request-init/set-body'
import { setMethod } from './request-init/set-method'
import { pipe } from 'ramda'

export const postData = async <T, D = undefined>(url: URL, data?: D): Promise<T> => {
  const response = await fetch(url, pipe(setMethod('POST'), setBody(data))(jsonContentTypeRequestInit))
  if (!response.ok) {
    throw Error()
  }
  return (await response.json()) as T
}
