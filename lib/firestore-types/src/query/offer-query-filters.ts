import { OfferState } from '../model/offer-state'
import { IncludeExpiredQueryFilter } from './include-expired-query-filter'
import { NonEmptyArray } from '@echo/utils'

export const OFFER_FILTER_AS: NonEmptyArray<string> = ['receiver', 'sender']
export type OfferFilterAs = (typeof OFFER_FILTER_AS)[number]

export interface OfferQueryFilters extends IncludeExpiredQueryFilter {
  as?: OfferFilterAs
  states?: OfferState[]
  notStates?: OfferState[]
}
