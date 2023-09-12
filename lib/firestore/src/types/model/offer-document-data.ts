import { OfferDiscordGuildDocumentData } from './offer-discord-guild-document-data'
import { OfferItemDocumentData } from './offer-item-document-data'
import { UserDetailsDocumentData } from './user-details-document-data'
import { OfferState } from '@echo/firestore-types'
import type { NonEmptyArray } from '@echo/utils/types'

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
  receiverItemsNftCollectionIds: NonEmptyArray<string>
  sender: UserDetailsDocumentData
  senderId: string
  senderItems: NonEmptyArray<OfferItemDocumentData>
  senderItemsNftIds: NonEmptyArray<string>
  senderItemsNftCollectionIds: NonEmptyArray<string>
  state: OfferState
  swapTransactionId?: string
}

export const offerFields = [
  'id',
  'createdAt',
  'discordGuild',
  'discordGuild.discordId',
  'discordGuild.threadId',
  'expiresAt',
  'listingsIds',
  'receiver',
  'receiver.discordAvatar',
  'receiver.discordBanner',
  'receiver.discordId',
  'receiver.discordUsername',
  'receiver.username',
  'receiver.wallet',
  'receiverId',
  'receiverItems',
  'receiverItemsNftIds',
  'receiverItemsNftCollectionIds',
  'sender',
  'sender.discordAvatar',
  'sender.discordBanner',
  'sender.discordId',
  'sender.discordUsername',
  'sender.username',
  'sender.wallet',
  'senderId',
  'senderItems',
  'senderItemsNftIds',
  'senderItemsNftCollectionIds',
  'state',
  'swapTransactionId'
]
