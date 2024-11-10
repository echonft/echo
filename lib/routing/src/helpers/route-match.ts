import type { Route } from '@echo/routing/services/route'
import type { Path } from '@echo/routing/types/path'
import type { RouteParams, RouteQueryParams, RouteSearchParams } from '@echo/routing/types/route'
import type { Nullable } from '@echo/utils/types/nullable'

export function routeMatch<T extends Route<RouteParams, RouteQueryParams, RouteSearchParams>>(routes: T[]) {
  return function (path: Path): Nullable<T> {
    for (const route of routes) {
      if (route.test(path)) {
        return route
      }
    }
    return undefined
  }
}
