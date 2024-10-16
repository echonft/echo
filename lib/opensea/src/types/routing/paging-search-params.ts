import type { SearchParams } from '@echo/routing/types/search-params/search-params'

export interface PagingSearchParams extends SearchParams {
  next?: string
  limit: number
}
