import type { SearchParams } from '@echo/api/types/routing/search-params/search-params'

export interface OfferSearchParams extends SearchParams {
  items: string[] | string
  target?: string
}
