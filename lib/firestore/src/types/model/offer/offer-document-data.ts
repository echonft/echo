import { type OfferItem } from '@echo/model/types/offer-item'
import { type OfferState } from '@echo/model/types/offer-state'
import { type User } from '@echo/model/types/user'
import { type NonEmptyArray } from '@echo/utils/types/non-empty-array'

export interface OfferDocumentData {
  id: string
  createdAt: number
  expiresAt: number
  receiver: User
  receiverItems: NonEmptyArray<OfferItem>
  receiverItemsNftIds: NonEmptyArray<string>
  receiverItemsNftCollectionIds: NonEmptyArray<string>
  sender: User
  senderItems: NonEmptyArray<OfferItem>
  senderItemsNftIds: NonEmptyArray<string>
  senderItemsNftCollectionIds: NonEmptyArray<string>
  state: OfferState
  updatedAt: number
}
