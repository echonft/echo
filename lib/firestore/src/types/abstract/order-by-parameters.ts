import { Field } from './field'
import { OrderByDirection } from 'firebase-admin/firestore'

export interface OrderByParameters {
  field: Field
  direction?: OrderByDirection
}
