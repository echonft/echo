import { LISTING_FILTER_AS } from '@echo/firestore/constants/listing-filter-as'
import type { IncludeExpiredQueryFilter } from '@echo/firestore/types/query/include-expired-query-filter'
import type { ListingState } from '@echo/model/types/listing-state'

export type ListingFilterAs = (typeof LISTING_FILTER_AS)[number]

export interface ListingQueryFilters extends IncludeExpiredQueryFilter {
  as?: ListingFilterAs
  states?: ListingState[]
  notStates?: ListingState[]
}
