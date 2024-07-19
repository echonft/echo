import { type ListingTargetRequest } from '@echo/api/types/requests/listing-target-request'
import type { Expiration } from '@echo/model/types/expiration'
import type { NftIndex } from '@echo/model/types/nft'

export interface CreateListingRequest {
  items: NftIndex[]
  target: ListingTargetRequest
  expiration: Expiration
}
