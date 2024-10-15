import { type ListingTargetRequest } from '@echo/api/types/requests/listing-target-request'
import type { Expiration } from '@echo/model/constants/expiration'
import type { NftIndex } from '@echo/model/types/nft'
import type { Strict } from '@echo/utils/types/strict'

export interface CreateListingRequest {
  items: Strict<NftIndex, NftIndex>[]
  target: ListingTargetRequest
  expiration: Expiration
}
