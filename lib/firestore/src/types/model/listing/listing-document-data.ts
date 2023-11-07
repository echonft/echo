import { type ListingItem } from '@echo/model/types/listing-item'
import { type ListingState } from '@echo/model/types/listing-state'
import { type ListingTarget } from '@echo/model/types/listing-target'
import { type User } from '@echo/model/types/user'

export interface ListingDocumentData {
  id: string
  createdAt: number
  creator: User
  expiresAt: number
  items: ListingItem[]
  itemsNftIds: string[]
  itemsNftCollectionIds: string[]
  state: ListingState
  targets: ListingTarget[]
  targetsIds: string[]
  updatedAt: number
}
