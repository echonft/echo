import type { OfferItemResponse } from '@echo/api/types/responses/model/offer-item-response'
import type { UserResponse } from '@echo/api/types/responses/model/user-response'
import type { FirestoreOfferState } from '@echo/firestore/types/model/firestore-offer-state'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export interface OfferResponse {
  id: string
  createdAt: number
  expired: boolean
  expiresAt: number
  receiver: Partial<UserResponse>
  receiverItems: NonEmptyArray<OfferItemResponse>
  sender: Partial<UserResponse>
  senderItems: NonEmptyArray<OfferItemResponse>
  state: FirestoreOfferState
  swapTransactionId?: string
}
