import { frontendRoutes } from '@echo/routing/constants/frontend-routes'
import type { FrontendRoute } from '@echo/routing/services/frontend/frontend-route'
import type { RouteParams, RouteQueryParams, RouteSearchParams } from '@echo/routing/types/route'
import { flatten, map, pipe, values } from 'ramda'

export function frontendRoutesArray(): FrontendRoute<RouteParams, RouteQueryParams, RouteSearchParams>[] {
  return pipe(values, map(values), flatten)(frontendRoutes) as FrontendRoute<
    RouteParams,
    RouteQueryParams,
    RouteSearchParams
  >[]
}
