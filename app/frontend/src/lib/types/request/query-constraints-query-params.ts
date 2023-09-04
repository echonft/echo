import { QueryType } from '@echo/utils'

export interface QueryConstraintsQueryParams extends QueryType {
  select?: string | string[]
  orderBy?: string[]
  limit?: number
  limitToLast?: number
  offset?: number
}
