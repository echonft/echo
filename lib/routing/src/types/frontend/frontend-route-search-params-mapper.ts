import type { RouteQueryParams, RouteSearchParams } from '@echo/routing/types/route'

export type FrontendRouteSearchParamsMapper<
  TQueryParams extends RouteQueryParams,
  TSearchParams extends RouteSearchParams
> = (params: TSearchParams) => TQueryParams
