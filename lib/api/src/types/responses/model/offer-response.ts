import type { OfferItemResponse } from '@echo/api/types/responses/model/offer-item-response'
import type { UserDetailsResponse } from '@echo/api/types/responses/model/user-details-response'
import type { FirestoreOfferState } from '@echo/firestore/types/model/offer/firestore-offer-state'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export interface OfferResponse {
  id: string
  createdAt: number
  expired: boolean
  expiresAt: number
  receiver: Partial<UserDetailsResponse>
  receiverItems: NonEmptyArray<OfferItemResponse>
  sender: Partial<UserDetailsResponse>
  senderItems: NonEmptyArray<OfferItemResponse>
  state: FirestoreOfferState
}
