import { QueryConstraintsQueryParams } from './query-constraints-query-params'

export interface GetUserListingsQueryParams extends QueryConstraintsQueryParams {
  state?: string | string[]
  notState?: string | string[]
  includedExpired?: string
}
