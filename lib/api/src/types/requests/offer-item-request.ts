import { type IdRequest } from '@echo/api/types/requests/id-request'

export interface OfferItemRequest {
  amount: number
  nft: IdRequest
}
