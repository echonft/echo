import type { FirestoreOfferState } from '@echo/firestore/types/model/firestore-offer-state'
import type { OfferDiscordGuildDocumentData } from '@echo/firestore/types/model/offer-discord-guild-document-data'
import type { OfferItemDocumentData } from '@echo/firestore/types/model/offer-item-document-data'
import type { UserDetailsDocumentData } from '@echo/firestore/types/model/user-details-document-data'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export interface OfferDocumentData {
  id: string
  createdAt: number
  discordGuild?: OfferDiscordGuildDocumentData
  expiresAt: number
  listingsIds: string[]
  receiver: UserDetailsDocumentData
  receiverItems: NonEmptyArray<OfferItemDocumentData>
  receiverItemsNftIds: NonEmptyArray<string>
  receiverItemsNftCollectionIds: NonEmptyArray<string>
  sender: UserDetailsDocumentData
  senderItems: NonEmptyArray<OfferItemDocumentData>
  senderItemsNftIds: NonEmptyArray<string>
  senderItemsNftCollectionIds: NonEmptyArray<string>
  state: FirestoreOfferState
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
  'receiver.wallet.address',
  'receiver.wallet.chainId',
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
  'sender.wallet.address',
  'sender.wallet.chainId',
  'senderItems',
  'senderItemsNftIds',
  'senderItemsNftCollectionIds',
  'state',
  'swapTransactionId'
]
