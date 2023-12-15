import { type ListingFilterAs } from '@echo/firestore/types/query/listing-query-filters'

export interface ListingFiltersQueryParams {
  as?: ListingFilterAs
  state?: string | string[]
  notState?: string | string[]
  includedExpired?: string
}
