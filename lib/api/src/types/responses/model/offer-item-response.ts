import type { NftResponse } from '@echo/api/types/responses/model/nft-response'

export interface OfferItemResponse {
  amount: number
  nft: NftResponse
}
