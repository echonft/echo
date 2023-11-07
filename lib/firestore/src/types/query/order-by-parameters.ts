import { type OrderByDirection } from 'firebase-admin/firestore'

export interface OrderByParameters {
  field: string
  direction: OrderByDirection
}
