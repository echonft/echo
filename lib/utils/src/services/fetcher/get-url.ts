import { getJsonContentTypeRequestInit } from './request-init/get-json-content-type-request-init'
import { setAuthorization } from './request-init/set-authorization'
import { R } from '@mobily/ts-belt'

export const getUrl = <T>(url: string, authorization?: string): Promise<R.Result<T, Error>> =>
  fetch(url, setAuthorization(authorization)(getJsonContentTypeRequestInit())).then((response) =>
    R.fromPromise(response.json())
  )

// TODO Functional, no worken bacon
// pipe(
//     useWith(fetch, [identity, converge(call, [setAuthorization, always(getJsonContentTypeRequestInit())])]),
//     andThen(pipe(converge(call, [invoker(0, 'json')]), R.fromPromise<T>))
// )(url, authorization)
