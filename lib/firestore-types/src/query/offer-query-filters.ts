import { OFFER_FILTER_AS } from '../constants/offer-filter-as'
import { OfferState } from '../model/offer-state'
import { IncludeExpiredQueryFilter } from './include-expired-query-filter'

export type OfferFilterAs = (typeof OFFER_FILTER_AS)[number]
export interface OfferQueryFilters extends IncludeExpiredQueryFilter {
  as?: OfferFilterAs
  states?: OfferState[]
  notStates?: OfferState[]
}
