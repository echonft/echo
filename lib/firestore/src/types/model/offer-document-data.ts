import { OfferItemDocumentData } from './offer-item-document-data'
import { OfferState } from './offer-state'
import { UserDetailsDocumentData } from './user-details-document-data'

export interface OfferDocumentData {
  id: string
  createdAt: number
  expiresAt: number
  postedAt?: number
  receiver: UserDetailsDocumentData
  receiverItems: OfferItemDocumentData[]
  receiverItemsNftIds: string[]
  sender: UserDetailsDocumentData
  senderItems: OfferItemDocumentData[]
  senderItemsNftIds: string[]
  state: OfferState
  threadId?: string
}
