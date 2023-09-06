import { OFFER_FILTER_AS } from './offer-query-filters'
import { NonEmptyArray } from '@echo/utils'

export const LISTING_FILTER_AS: NonEmptyArray<string> = ['item', 'target']
export type ListingFilterAs = (typeof OFFER_FILTER_AS)[number]

export interface ListingAsQueryFilter {
  as?: ListingFilterAs
}
