import { ListingItemDocumentData } from './listing-item-document-data'
import { ListingState } from './listing-state'
import { ListingTargetDocumentData } from './listing-target-document-data'
import { UserDetailsDocumentData } from './user-details-document-data'
import { NonEmptyArray } from '@echo/utils'

export interface ListingDocumentData {
  id: string
  createdAt: number
  creator: UserDetailsDocumentData
  creatorId: string
  expiresAt: number
  items: NonEmptyArray<ListingItemDocumentData>
  itemsNftIds: NonEmptyArray<string>
  offersIds: string[]
  state: ListingState
  targets: NonEmptyArray<ListingTargetDocumentData>
  targetsIds: NonEmptyArray<string>
}

export const listingFields = [
  'id',
  'createdAt',
  'creator.discordAvatar',
  'creator.discordBanner',
  'creator.discordId',
  'creator.discordUsername',
  'creator.wallet',
  'creatorId',
  'expiresAt',
  'items',
  'itemsNftIds',
  'state',
  'targets',
  'targetsIds'
]
