import { NftResponse } from './nft-response'

export interface ListingItemResponse {
  amount: number
  nft: Partial<NftResponse>
}
