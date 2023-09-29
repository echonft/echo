import type { OrderByParameters } from '@echo/firestore/types/query/order-by-parameters'

export interface QueryConstraints {
  select?: string[]
  orderBy?: OrderByParameters[]
  limit?: number
  limitToLast?: number
  offset?: number
}
