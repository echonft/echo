import { type OfferFilterAs } from '@echo/firestore/types/query/offer-query-filters'

export interface OfferFiltersQueryParams {
  as?: OfferFilterAs
  state?: string | string[]
  notState?: string | string[]
  includedExpired?: string
}
