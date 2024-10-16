import type { SearchParams } from '@echo/routing/types/search-params/search-params'

export interface OfferSearchParams extends SearchParams {
  items: string[] | string
  target?: string
}
