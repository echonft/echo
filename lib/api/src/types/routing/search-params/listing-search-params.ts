import type { SearchParams } from '@echo/api/types/routing/search-params/search-params'

export interface ListingSearchParams extends SearchParams {
  items?: string[] | string
  target?: string
}
