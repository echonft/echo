import { type IdRequest } from '@echo/api/types/requests/id-request'

export interface ListingTargetRequest {
  amount: number
  collection: IdRequest
}
