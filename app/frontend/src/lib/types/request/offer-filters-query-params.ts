import { OfferFilterAs } from '@echo/firestore-types'
import { QueryType } from '@echo/utils'

export interface OfferFiltersQueryParams extends QueryType {
  as?: OfferFilterAs
  state?: string | string[]
  notState?: string | string[]
  includedExpired?: string
}
