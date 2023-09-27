import type { CollectionResponse } from '@echo/api/types/responses/model/collection-response'

export interface ListingTargetResponse {
  collection: CollectionResponse
  amount: number
}
