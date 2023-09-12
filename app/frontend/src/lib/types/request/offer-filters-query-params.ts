import type { OfferFilterAs } from '@echo/firestore-types'
import type { QueryType } from '@echo/utils/types'

export interface OfferFiltersQueryParams extends QueryType {
  as?: OfferFilterAs
  state?: string | string[]
  notState?: string | string[]
  includedExpired?: string
}
