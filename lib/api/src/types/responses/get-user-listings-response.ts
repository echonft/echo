import { ListingResponse } from './model/listing-response'

export interface GetUserListingsResponse {
  listings: Array<Partial<ListingResponse>>
}
