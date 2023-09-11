import type { OfferState } from '@echo/firestore-types'
import type { NonEmptyArray } from '@echo/utils'
import type { OfferItemResponse } from '@echo-api/types/responses/model/offer-item-response'
import type { UserResponse } from '@echo-api/types/responses/model/user-response'

export interface OfferResponse {
  id: string
  createdAt: number
  expired: boolean
  expiresAt: number
  receiver: Partial<UserResponse>
  receiverItems: NonEmptyArray<OfferItemResponse>
  sender: Partial<UserResponse>
  senderItems: NonEmptyArray<OfferItemResponse>
  state: OfferState
  swapTransactionId?: string
}
