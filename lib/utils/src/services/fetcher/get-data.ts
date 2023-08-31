import { jsonContentTypeRequestInit } from './request-init/json-content-type-request-init'
import { setAuthorization } from './request-init/set-authorization'
import { setMethod } from './request-init/set-method'
import { setSearchParams } from './url/set-search-params'
import { pipe } from 'ramda'

export const getData = async <
  T,
  D extends Record<string, string | number | string[] | undefined> | undefined = undefined
>(
  url: URL,
  data?: D,
  authorization?: string
): Promise<T> => {
  const response: Response = await fetch(
    setSearchParams(url, data),
    pipe(setMethod('GET'), setAuthorization(authorization))(jsonContentTypeRequestInit)
  )
  if (!response.ok) {
    console.log(`fetch error ${JSON.stringify(response)}`)
    throw Error()
  }
  return (await response.json()) as T
}
