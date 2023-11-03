import { type OfferItem } from '@echo/model/types/offer-item'
import { type OfferState } from '@echo/model/types/offer-state'
import { type User } from '@echo/model/types/user'

export interface OfferDocumentData {
  id: string
  createdAt: number
  expiresAt: number
  receiver: User
  receiverItems: OfferItem[]
  receiverItemsNftIds: string[]
  receiverItemsNftCollectionIds: string[]
  sender: User
  senderItems: OfferItem[]
  senderItemsNftIds: string[]
  senderItemsNftCollectionIds: string[]
  state: OfferState
  updatedAt: number
}
