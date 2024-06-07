import { type ListingTargetRequest } from '@echo/api/types/requests/listing-target-request'
import type { NftIndex } from '@echo/model/types/nft-index'

export interface CreateListingRequest {
  items: NftIndex[]
  target: ListingTargetRequest
  expiresAt: number
}
