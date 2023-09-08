import { ListingItemDocumentData } from './listing-item-document-data'
import { ListingTargetDocumentData } from './listing-target-document-data'
import { UserDetailsDocumentData } from './user-details-document-data'
import { ListingState } from '@echo/firestore-types'
import { NonEmptyArray } from '@echo/utils'

export interface ListingDocumentData {
  id: string
  createdAt: number
  creator: UserDetailsDocumentData
  creatorId: string
  expiresAt: number
  items: NonEmptyArray<ListingItemDocumentData>
  itemsNftIds: NonEmptyArray<string>
  itemsNftCollectionIds: NonEmptyArray<string>
  offersIds: string[]
  state: ListingState
  targets: NonEmptyArray<ListingTargetDocumentData>
  targetsIds: NonEmptyArray<string>
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
  'creatorId',
  'expiresAt',
  'items',
  'itemsNftIds',
  'itemsNftCollectionIds',
  'state',
  'targets',
  'targetsIds'
]
