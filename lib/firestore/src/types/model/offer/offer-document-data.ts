import type { FirestoreOfferState } from '@echo/firestore/types/model/offer/firestore-offer-state'
import type { OfferItemDocumentData } from '@echo/firestore/types/model/offer/offer-item-document-data'
import { FirestoreUserDetails } from '@echo/firestore/types/model/user/firestore-user-details'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export interface OfferDocumentData {
  id: string
  createdAt: number
  expiresAt: number
  receiver: FirestoreUserDetails
  receiverItems: NonEmptyArray<OfferItemDocumentData>
  receiverItemsNftIds: NonEmptyArray<string>
  receiverItemsNftCollectionIds: NonEmptyArray<string>
  sender: FirestoreUserDetails
  senderItems: NonEmptyArray<OfferItemDocumentData>
  senderItemsNftIds: NonEmptyArray<string>
  senderItemsNftCollectionIds: NonEmptyArray<string>
  state: FirestoreOfferState
  updatedAt: number
}

export const offerFields = [
  'id',
  'createdAt',
  'expiresAt',
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
  'updatedAt'
]
