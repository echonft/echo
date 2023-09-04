import { ListingState } from './listing-state'

export interface ListingsQueryFilters {
  states?: ListingState[]
  notStates?: ListingState[]
  includeExpired?: boolean
}
