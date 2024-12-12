import type { RouteQueryParams } from '@echo/routing/types/route'

export interface PagingQueryParams extends RouteQueryParams {
  page: number
  pageSize: number
}
