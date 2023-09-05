import { NftCollectionResponse } from './nft-collection-response'

export interface ListingTargetResponse {
  collection: Partial<NftCollectionResponse>
  amount: number
}
