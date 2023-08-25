import { ListingItemDocumentData } from './listing-item-document-data'
import { ListingState } from './listing-state'
import { ListingTargetDocumentData } from './listing-target-document-data'
import { UserDetailsDocumentData } from './user-details-document-data'
import { NonEmptyArray } from '@echo/utils'

export interface ListingDocumentData {
  id: string
  createdAt: number
  creator: UserDetailsDocumentData
  expiresAt: number
  items: NonEmptyArray<ListingItemDocumentData>
  itemsNftIds: NonEmptyArray<string>
  offersIds: string[]
  postedAt?: number
  state: ListingState
  targets: NonEmptyArray<ListingTargetDocumentData>
  targetsIds: NonEmptyArray<string>
}
