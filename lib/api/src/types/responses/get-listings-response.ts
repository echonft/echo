import { ListingResponse } from './model/listing-response'

export interface GetListingsResponse {
  listings: Array<Partial<ListingResponse>>
}
