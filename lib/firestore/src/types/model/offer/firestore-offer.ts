import type { FirestoreOfferItem } from '@echo/firestore/types/model/offer/firestore-offer-item'
import type { FirestoreOfferState } from '@echo/firestore/types/model/offer/firestore-offer-state'
import type { FirestoreUserDetails } from '@echo/firestore/types/model/user/firestore-user-details'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export interface FirestoreOffer {
  id: string
  createdAt: number
  expired: boolean
  expiresAt: number
  receiver: FirestoreUserDetails
  receiverItems: NonEmptyArray<FirestoreOfferItem>
  sender: FirestoreUserDetails
  senderItems: NonEmptyArray<FirestoreOfferItem>
  state: FirestoreOfferState
  updatedAt: number
  signature: string | undefined
}
