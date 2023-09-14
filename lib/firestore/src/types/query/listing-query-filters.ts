import { LISTING_FILTER_AS } from '@echo/firestore/constants/listing-filter-as'
import type { FirestoreListingState } from '@echo/firestore/types/model/firestore-listing-state'
import type { IncludeExpiredQueryFilter } from '@echo/firestore/types/query/include-expired-query-filter'

export type ListingFilterAs = (typeof LISTING_FILTER_AS)[number]

export interface ListingQueryFilters extends IncludeExpiredQueryFilter {
  as?: ListingFilterAs
  states?: FirestoreListingState[]
  notStates?: FirestoreListingState[]
}
