import { frontendRoutesArray } from '@echo/routing/helpers/frontend/frontend-routes-array'
import { routeMatch } from '@echo/routing/helpers/route-match'
import type { FrontendRoute } from '@echo/routing/services/frontend/frontend-route'
import type { Path } from '@echo/routing/types/path'
import type { RouteParams, RouteQueryParams, RouteSearchParams } from '@echo/routing/types/route'
import type { Nullable } from '@echo/utils/types/nullable'

export function frontendRouteMatch(
  path: Path
): Nullable<FrontendRoute<RouteParams, RouteQueryParams, RouteSearchParams>> {
  const routes = frontendRoutesArray()
  return routeMatch(routes)(path)
}
