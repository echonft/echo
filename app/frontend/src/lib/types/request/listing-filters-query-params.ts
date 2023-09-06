import { QueryType } from '@echo/utils'

export interface ListingFiltersQueryParams extends QueryType {
  state?: string | string[]
  notState?: string | string[]
  includedExpired?: string
}
