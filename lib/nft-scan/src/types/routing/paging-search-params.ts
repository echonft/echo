import type { RouteSearchParams } from '@echo/routing/types/route'

export interface PagingSearchParams extends RouteSearchParams {
  cursor?: string
  limit: number
}
