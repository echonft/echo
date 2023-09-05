import { NftResponse } from './nft-response'

export interface OfferItemResponse {
  amount: number
  nft: Partial<NftResponse>
}
