import type { FirestoreListingItem } from '@echo/firestore/types/model/listing/firestore-listing-item'
import type { FirestoreListingState } from '@echo/firestore/types/model/listing/firestore-listing-state'
import type { FirestoreListingTarget } from '@echo/firestore/types/model/listing/firestore-listing-target'
import type { FirestoreUserDetails } from '@echo/firestore/types/model/user/firestore-user-details'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export interface ListingDocumentData {
  id: string
  createdAt: number
  creator: FirestoreUserDetails
  expiresAt: number
  items: NonEmptyArray<FirestoreListingItem>
  itemsNftIds: NonEmptyArray<string>
  itemsNftCollectionIds: NonEmptyArray<string>
  state: FirestoreListingState
  targets: NonEmptyArray<FirestoreListingTarget>
  targetsIds: NonEmptyArray<string>
  updatedAt: number
}

export const listingFields = [
  'id',
  'createdAt',
  'creator',
  'creator.discord',
  'creator.discord.avatarUrl',
  'creator.discord.username',
  'creator.username',
  'creator.wallet',
  'creator.wallet.address',
  'creator.wallet.chainId',
  'expiresAt',
  'items',
  'itemsNftIds',
  'itemsNftCollectionIds',
  'state',
  'targets',
  'targetsIds',
  'updatedAt'
]
