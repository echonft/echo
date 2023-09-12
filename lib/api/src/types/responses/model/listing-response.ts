import type { ListingState } from '@echo/firestore-types'
import type { NonEmptyArray } from '@echo/utils/types'
import type { ListingItemResponse } from '@echo-api/types/responses/model/listing-item-response'
import type { ListingTargetResponse } from '@echo-api/types/responses/model/listing-target-response'
import type { UserResponse } from '@echo-api/types/responses/model/user-response'

export interface ListingResponse {
  id: string
  createdAt: number
  creator: Partial<UserResponse>
  expired: boolean
  expiresAt: number
  items: NonEmptyArray<ListingItemResponse>
  state: ListingState
  targets: NonEmptyArray<ListingTargetResponse>
}
