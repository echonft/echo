import { ActivityDocumentData } from './activity-document-data'
import { DiscordGuildDocumentData } from './discord-guild-document-data'
import { NftDocumentData } from './nft-document-data'
import { OfferDocumentData } from './offer-document-data'
import { OfferItemDetailsDocumentData } from './offer-item-details-document-data'
import { RequestForOfferTargetDocumentData } from './request-for-offer-target-document-data'
import { SwapDocumentData } from './swap-document-data'
import { UserDocumentData } from './user-document-data'
import { DocumentData, DocumentReference } from 'firebase-admin/firestore'

export interface RequestForOfferDocumentData extends DocumentData {
  activities: ActivityDocumentData[]
  createdAt: number
  creator: DocumentReference<UserDocumentData>
  creatorDiscordAvatar?: string
  creatorDiscordId: string
  creatorDiscordUsername: string
  discordGuild: DocumentReference<DiscordGuildDocumentData>
  expiresAt: number
  items: DocumentReference<NftDocumentData>[]
  itemsDetails: OfferItemDetailsDocumentData[]
  offers?: DocumentReference<OfferDocumentData>[]
  postedAt?: number
  state: string
  swaps?: DocumentReference<SwapDocumentData>[]
  target: RequestForOfferTargetDocumentData[]
}
