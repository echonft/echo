import { type OfferFilterAs } from '@echo/firestore/types/query/offer-query-filters'
import { type QueryType } from '@echo/utils/types/query-type'

export interface OfferFiltersQueryParams extends QueryType {
  as?: OfferFilterAs
  state?: string | string[]
  notState?: string | string[]
  includedExpired?: string
}
