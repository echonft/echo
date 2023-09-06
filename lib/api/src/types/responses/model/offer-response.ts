import { OfferItemResponse } from './offer-item-response'
import { UserResponse } from './user-response'
import { OfferState } from '@echo/firestore-types'
import { NonEmptyArray } from '@echo/utils'

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
