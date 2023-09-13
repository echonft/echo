import type { NftCollectionResponse } from '@echo/api/types/responses/model/nft-collection-response'

export interface ListingTargetResponse {
  collection: Partial<NftCollectionResponse>
  amount: number
}
