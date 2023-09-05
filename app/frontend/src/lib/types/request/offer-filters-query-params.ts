import { OfferFilterAs } from '@echo/firestore-types'

export interface OfferFiltersQueryParams {
  as?: OfferFilterAs
  state?: string | string[]
  notState?: string | string[]
  includedExpired?: string
}
