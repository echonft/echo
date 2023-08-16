import { ActivityDocumentData } from './activity-document-data'
import { OfferDocumentData } from './offer-document-data'
import { OfferItemDetailsDocumentData } from './offer-item-details-document-data'
import { DocumentData, DocumentReference } from 'firebase-admin/firestore'

export interface SwapDocumentData extends DocumentData {
  activities: ActivityDocumentData[]
  createdAt: number
  expiresAt: number
  offer: DocumentReference<OfferDocumentData>
  receiverDiscordAvatar?: string
  receiverDiscordId: string
  receiverDiscordUsername: string
  receiverItemsDetails: OfferItemDetailsDocumentData[]
  senderDiscordAvatar?: string
  senderDiscordId: string
  senderDiscordUsername: string
  senderItemsDetails: OfferItemDetailsDocumentData[]
  state: string
}
