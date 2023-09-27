import type { ListingResponse } from '@echo/api/types/responses/model/listing-response'

export interface GetListingsResponse {
  listings: Array<ListingResponse>
}
