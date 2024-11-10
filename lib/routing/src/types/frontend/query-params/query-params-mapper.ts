import type { RouteQueryParams, RouteSearchParams } from '@echo/routing/types/route'

export type QueryParamsMapper<TQueryParams extends RouteQueryParams, TSearchParams extends RouteSearchParams> = (
  queryParams: TQueryParams
) => TSearchParams
