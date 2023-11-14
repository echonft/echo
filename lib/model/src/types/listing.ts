import { type ListingItem } from '@echo/model/types/listing-item'
import { type ListingState } from '@echo/model/types/listing-state'
import { type ListingTarget } from '@echo/model/types/listing-target'
import { type User } from '@echo/model/types/user'

export interface Listing {
  id: string
  createdAt: number
  creator: User
  expired: boolean
  expiresAt: number
  items: ListingItem[]
  state: ListingState
  targets: ListingTarget[]
  updatedAt: number
}
