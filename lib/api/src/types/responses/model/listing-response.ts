import { ListingItemResponse } from './listing-item-response'
import { ListingTargetResponse } from './listing-target-response'
import { UserResponse } from './user-response'
import { ListingState } from '@echo/firestore-types'
import { NonEmptyArray } from '@echo/utils'

export interface ListingResponse {
  id: string
  creator: UserResponse
  expired: boolean
  expiresAt: number
  items: NonEmptyArray<ListingItemResponse>
  state: ListingState
  targets: NonEmptyArray<ListingTargetResponse>
}
