import type { IdRequest } from '@echo-api/types/requests/id-request'

export interface ListingItemRequest {
  amount: number
  nft: IdRequest
}
