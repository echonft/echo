import { OfferState } from '../model/offer-state'
import { IncludeExpiredQueryFilter } from './include-expired-query-filter'

export interface OfferQueryFilters extends IncludeExpiredQueryFilter {
  states?: OfferState[]
  notStates?: OfferState[]
}
