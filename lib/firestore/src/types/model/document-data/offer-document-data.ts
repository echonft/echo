import { ActivityDocumentData } from './activity-document-data'
import { DiscordGuildDocumentData } from './discord-guild-document-data'
import { NftDocumentData } from './nft-document-data'
import { OfferItemDetailsDocumentData } from './offer-item-details-document-data'
import { UserDocumentData } from './user-document-data'
import { DocumentData, DocumentReference } from 'firebase-admin/firestore'

export interface OfferDocumentData extends DocumentData {
  activities: ActivityDocumentData[]
  createdAt: number
  discordGuild: DocumentReference<DiscordGuildDocumentData>
  expiresAt: number
  postedAt?: number
  receiver: DocumentReference<UserDocumentData>
  receiverDiscordAvatar?: string
  receiverDiscordId: string
  receiverDiscordUsername: string
  receiverItems: DocumentReference<NftDocumentData>[]
  receiverItemsDetails: OfferItemDetailsDocumentData[]
  sender: DocumentReference<UserDocumentData>
  senderDiscordAvatar?: string
  senderDiscordId: string
  senderDiscordUsername: string
  senderItems: DocumentReference<NftDocumentData>[]
  senderItemsDetails: OfferItemDetailsDocumentData[]
  state: string
  threadId?: string
}
