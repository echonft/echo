import { OFFER_FILTER_AS } from '@echo/firestore/constants/offer/offer-filter-as'
import type { StateQueryFilter } from '@echo/firestore/types/query/state-query-filter'
import { type OfferState } from '@echo/model/types/offer-state'

export type OfferFilterAs = (typeof OFFER_FILTER_AS)[number]
export interface OfferQueryFilters extends StateQueryFilter<OfferState> {
  as?: OfferFilterAs
}
