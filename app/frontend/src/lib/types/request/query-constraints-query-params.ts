import type { QueryType } from '@echo/utils/types/query-type'

export interface QueryConstraintsQueryParams extends QueryType {
  select?: string | string[]
  orderBy?: string[]
  limit?: number
  limitToLast?: number
  offset?: number
}
