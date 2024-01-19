import { LISTING_FILTER_AS } from '@echo/firestore/constants/listing/listing-filter-as'
import type { StateQueryFilter } from '@echo/firestore/types/query/state-query-filter'
import { type ListingState } from '@echo/model/types/listing-state'

export type ListingFilterAs = (typeof LISTING_FILTER_AS)[number]
export interface ListingQueryFilters extends StateQueryFilter<ListingState> {
  as?: ListingFilterAs
}
