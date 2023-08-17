import { ActivityDocumentData } from './activity-document-data'
import { OfferItemDocumentData } from './offer-item-document-data'
import { OfferState } from './offer-state'
import { UserDetailsDocumentData } from './user-details-document-data'

export interface OfferDocumentData {
  id: string
  activities: ActivityDocumentData[]
  createdAt: number
  expiresAt: number
  postedAt?: number
  receiver: UserDetailsDocumentData
  receiverItems: OfferItemDocumentData[]
  sender: UserDetailsDocumentData
  senderItems: OfferItemDocumentData[]
  state: OfferState
  threadId?: string
}
