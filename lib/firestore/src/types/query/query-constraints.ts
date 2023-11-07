import { type OrderByParameters } from '@echo/firestore/types/query/order-by-parameters'

export interface QueryConstraints<T> {
  select?: (keyof T)[]
  orderBy?: OrderByParameters[]
  limit?: number
  offset?: number
}
