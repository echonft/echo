import { ApiRoutes } from '@echo/api/dist/routes/constants/api-routes'
import { getApiRouteUrl } from '@echo/api/dist/routes/utils/get-api-route-url'
import { castAs } from '@echo/utils'
import { andThen, call, invoker, isNil, pipe } from 'ramda'

export function fetchApi<T>(
  route: ApiRoutes,
  method: string,
  options?: Record<string, string>,
  query?: Record<string, string>
): Promise<T> {
  const opt = { method, headers: { accept: 'application/json' }, ...options }
  return pipe(fetch, andThen(pipe(invoker(0, 'json'), call, castAs<T>)))(getApiWithQueryString(route, query), opt)
}

const getApiWithQueryString = (route: ApiRoutes, query?: Record<string, string>) => {
  if (isNil(query)) {
    return getApiRouteUrl(route)
  }
  const params = new URLSearchParams(query)
  return `${getApiRouteUrl(route)}?${params.toString()}`
}
