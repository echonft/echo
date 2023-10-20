import { type ListingItem } from '@echo/model/types/listing-item'
import { type ListingState } from '@echo/model/types/listing-state'
import { type ListingTarget } from '@echo/model/types/listing-target'
import { type User } from '@echo/model/types/user'
import { type NonEmptyArray } from '@echo/utils/types/non-empty-array'

export interface ListingDocumentData {
  id: string
  createdAt: number
  creator: User
  expiresAt: number
  items: NonEmptyArray<ListingItem>
  itemsNftIds: NonEmptyArray<string>
  itemsNftCollectionIds: NonEmptyArray<string>
  state: ListingState
  targets: NonEmptyArray<ListingTarget>
  targetsIds: NonEmptyArray<string>
  updatedAt: number
}
