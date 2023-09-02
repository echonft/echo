import { OrderByParameters } from './order-by-parameters'

export interface QueryConstraints {
  select?: string | string[]
  orderBy?: OrderByParameters | OrderByParameters[]
  limit?: number
  limitToLast?: number
  offset?: number
}
