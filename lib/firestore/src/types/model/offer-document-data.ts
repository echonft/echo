import { OfferItemDocumentData } from './offer-item-document-data'
import { OfferState } from './offer-state'
import { UserDetailsDocumentData } from './user-details-document-data'
import { NonEmptyArray } from '@echo/utils'

export interface OfferDocumentData {
  id: string
  createdAt: number
  expiresAt: number
  postedAt?: number
  listingsIds: string[]
  receiver: UserDetailsDocumentData
  receiverItems: NonEmptyArray<OfferItemDocumentData>
  receiverItemsNftIds: NonEmptyArray<string>
  sender: UserDetailsDocumentData
  senderItems: NonEmptyArray<OfferItemDocumentData>
  senderItemsNftIds: NonEmptyArray<string>
  state: OfferState
  threadId?: string
}
