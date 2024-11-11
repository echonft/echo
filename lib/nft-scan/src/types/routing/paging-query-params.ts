import type { RouteQueryParams } from '@echo/routing/types/route'

export interface PagingQueryParams extends RouteQueryParams {
  limit?: number // Must be between 1 and 100. Default: 20
  next?: string
}
