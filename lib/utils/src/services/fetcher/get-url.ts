import { getJsonContentTypeRequestInit } from './request-init/get-json-content-type-request-init'
import { setAuthorization } from './request-init/set-authorization'

export const getUrl = <T>(url: string, authorization?: string): Promise<T> =>
  fetch(url, setAuthorization(authorization)(getJsonContentTypeRequestInit())).then((response) => response.json() as T)

// TODO Functional, no worken bacon
// pipe(
//     useWith(fetch, [identity, converge(call, [setAuthorization, always(getJsonContentTypeRequestInit())])]),
//     andThen(pipe(converge(call, [invoker(0, 'json')])))
// )(url, authorization)
