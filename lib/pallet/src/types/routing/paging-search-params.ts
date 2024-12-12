import type { RouteSearchParams } from '@echo/routing/types/route'

export interface PagingSearchParams extends RouteSearchParams {
  page: number
  page_size: number
}
