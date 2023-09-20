import type { OrderByDirection } from 'firebase-admin/lib/firestore'

export interface OrderByParameters {
  field: string
  direction?: OrderByDirection
}
