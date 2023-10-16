import { OFFER_FILTER_AS } from '@echo/firestore/constants/offer-filter-as'
import type { IncludeExpiredQueryFilter } from '@echo/firestore/types/query/include-expired-query-filter'
import type { OfferState } from '@echo/model/types/offer-state'

export type OfferFilterAs = (typeof OFFER_FILTER_AS)[number]
export interface OfferQueryFilters extends IncludeExpiredQueryFilter {
  as?: OfferFilterAs
  states?: OfferState[]
  notStates?: OfferState[]
}
