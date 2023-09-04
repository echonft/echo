import { ListingState } from '../model/listing-state'
import { IncludeExpiredQueryFilter } from './include-expired-query-filter'

export interface ListingQueryFilters extends IncludeExpiredQueryFilter {
  states?: ListingState[]
  notStates?: ListingState[]
}
