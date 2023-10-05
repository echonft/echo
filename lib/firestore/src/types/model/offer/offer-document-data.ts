import { FirestoreOfferItem } from '@echo/firestore/types/model/offer/firestore-offer-item'
import type { FirestoreOfferState } from '@echo/firestore/types/model/offer/firestore-offer-state'
import { FirestoreUserDetails } from '@echo/firestore/types/model/user/firestore-user-details'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export interface OfferDocumentData {
  id: string
  createdAt: number
  expiresAt: number
  receiver: FirestoreUserDetails
  receiverItems: NonEmptyArray<FirestoreOfferItem>
  receiverItemsNftIds: NonEmptyArray<string>
  receiverItemsNftCollectionIds: NonEmptyArray<string>
  sender: FirestoreUserDetails
  senderItems: NonEmptyArray<FirestoreOfferItem>
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
  'receiver.discord',
  'receiver.discord.avatarUrl',
  'receiver.discord.username',
  'receiver.username',
  'receiver.wallet',
  'receiver.wallet.address',
  'receiver.wallet.chainId',
  'receiverItems',
  'receiverItemsNftIds',
  'receiverItemsNftCollectionIds',
  'sender',
  'sender.discord',
  'sender.discord.avatarUrl',
  'sender.discord.username',
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
