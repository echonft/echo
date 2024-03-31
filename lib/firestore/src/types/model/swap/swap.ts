import type { WithId } from '@echo/model/types/with-id'

export interface Swap extends WithId {
  offerId: string
  transactionId: string
  createdAt: number
}
