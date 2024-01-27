import { type IdRequest } from '@echo/api/types/requests/id-request'

export interface ItemRequest {
  amount: number
  nft: IdRequest
}
