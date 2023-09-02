import { OfferDiscordGuildDocumentData } from './offer-discord-guild-document-data'
import { OfferItemDocumentData } from './offer-item-document-data'
import { OfferState } from './offer-state'
import { UserDetailsDocumentData } from './user-details-document-data'
import { NonEmptyArray } from '@echo/utils'

export interface OfferDocumentData {
  id: string
  createdAt: number
  discordGuild?: OfferDiscordGuildDocumentData
  expiresAt: number
  listingsIds: string[]
  receiver: UserDetailsDocumentData
  receiverId: string
  receiverItems: NonEmptyArray<OfferItemDocumentData>
  receiverItemsNftIds: NonEmptyArray<string>
  sender: UserDetailsDocumentData
  senderId: string
  senderItems: NonEmptyArray<OfferItemDocumentData>
  senderItemsNftIds: NonEmptyArray<string>
  state: OfferState
  swapTransactionId?: string
}
