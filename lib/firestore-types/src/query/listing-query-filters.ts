import { LISTING_FILTER_AS } from '../constants/listing-filter-as'
import { ListingState } from '../model/listing-state'
import { IncludeExpiredQueryFilter } from './include-expired-query-filter'

export type ListingFilterAs = (typeof LISTING_FILTER_AS)[number]

export interface ListingQueryFilters extends IncludeExpiredQueryFilter {
  as?: ListingFilterAs
  states?: ListingState[]
  notStates?: ListingState[]
}
