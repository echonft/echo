import { type ApiRequest } from '@echo/api/types/api-request'
import { type CreateListingRequest } from '@echo/api/types/requests/create-listing-request'
import { type ListingResponse } from '@echo/api/types/responses/listing-response'
import { assertListing } from '@server/helpers/listing/assert/assert-listing'
import { getListing } from '@server/helpers/listing/get-listing'
import { NextResponse } from 'next/server'

export async function getListingRequestHandler(_req: ApiRequest<CreateListingRequest>, listingId: string) {
  const listing = await getListing(listingId)
  assertListing(listing)
  return NextResponse.json<ListingResponse>({ listing })
}
