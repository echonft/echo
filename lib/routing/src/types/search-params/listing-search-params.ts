import type { Slug } from '@echo/model/types/slug'
import type { SearchParams } from '@echo/routing/types/search-params/search-params'

export interface ListingSearchParams extends SearchParams {
  items?: string[] | string
  target?: Slug
}
