import { type ListingFilterAs } from '@echo/firestore/types/query/listing-query-filters'
import { type QueryType } from '@echo/utils/types/query-type'

export interface ListingFiltersQueryParams extends QueryType {
  as?: ListingFilterAs
  state?: string | string[]
  notState?: string | string[]
  includedExpired?: string
}
