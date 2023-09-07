import { ListingState } from '../model/listing-state'
import { IncludeExpiredQueryFilter } from './include-expired-query-filter'
import { NonEmptyArray } from '@echo/utils'

export const LISTING_FILTER_AS: NonEmptyArray<string> = ['item', 'target']
export type ListingFilterAs = (typeof LISTING_FILTER_AS)[number]

export interface ListingQueryFilters extends IncludeExpiredQueryFilter {
  as?: ListingFilterAs
  states?: ListingState[]
  notStates?: ListingState[]
}
