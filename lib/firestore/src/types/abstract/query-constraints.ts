import { Field } from './field'
import { OrderByParameters } from './order-by-parameters'

export interface QueryConstraints {
  select?: Field | Field[]
  orderBy?: OrderByParameters | OrderByParameters[]
  limit?: number
  limitToLast?: number
  offset?: number
}
