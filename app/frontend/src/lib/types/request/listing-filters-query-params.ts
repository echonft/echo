import type { ListingFilterAs } from '@echo/firestore-types'
import type { QueryType } from '@echo/utils'

export interface ListingFiltersQueryParams extends QueryType {
  as?: ListingFilterAs
  state?: string | string[]
  notState?: string | string[]
  includedExpired?: string
}
