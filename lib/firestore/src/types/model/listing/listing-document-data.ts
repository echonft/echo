import type { FirestoreListingState } from '@echo/firestore/types/model/listing/firestore-listing-state'
import type { ListingItemDocumentData } from '@echo/firestore/types/model/listing/listing-item-document-data'
import type { ListingTargetDocumentData } from '@echo/firestore/types/model/listing/listing-target-document-data'
import { FirestoreUserDetails } from '@echo/firestore/types/model/user/firestore-user-details'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export interface ListingDocumentData {
  id: string
  createdAt: number
  creator: FirestoreUserDetails
  expiresAt: number
  items: NonEmptyArray<ListingItemDocumentData>
  itemsNftIds: NonEmptyArray<string>
  itemsNftCollectionIds: NonEmptyArray<string>
  state: FirestoreListingState
  targets: NonEmptyArray<ListingTargetDocumentData>
  targetsIds: NonEmptyArray<string>
  updatedAt: number
}

export const listingFields = [
  'id',
  'createdAt',
  'creator',
  'creator.discordAvatar',
  'creator.discordBanner',
  'creator.discordId',
  'creator.discordUsername',
  'creator.wallet',
  'creator.wallet.address',
  'creator.wallet.chainId',
  'creator.username',
  'expiresAt',
  'items',
  'itemsNftIds',
  'itemsNftCollectionIds',
  'state',
  'targets',
  'targetsIds',
  'updatedAt'
]
