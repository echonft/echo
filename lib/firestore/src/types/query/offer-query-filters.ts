import { OFFER_FILTER_AS } from '@echo/firestore/constants/offer-filter-as'
import type { FirestoreOfferState } from '@echo/firestore/types/model/offer/firestore-offer-state'
import type { IncludeExpiredQueryFilter } from '@echo/firestore/types/query/include-expired-query-filter'

export type OfferFilterAs = (typeof OFFER_FILTER_AS)[number]
export interface OfferQueryFilters extends IncludeExpiredQueryFilter {
  as?: OfferFilterAs
  states?: FirestoreOfferState[]
  notStates?: FirestoreOfferState[]
}
