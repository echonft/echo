import type { ListingItemResponse } from '@echo/api/types/responses/model/listing-item-response'
import type { ListingTargetResponse } from '@echo/api/types/responses/model/listing-target-response'
import type { UserDetailsResponse } from '@echo/api/types/responses/model/user-details-response'
import type { FirestoreListingState } from '@echo/firestore/types/model/listing/firestore-listing-state'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export interface ListingResponse {
  id: string
  createdAt: number
  creator: UserDetailsResponse
  expired: boolean
  expiresAt: number
  items: NonEmptyArray<ListingItemResponse>
  state: FirestoreListingState
  targets: NonEmptyArray<ListingTargetResponse>
  updatedAt: number
}
