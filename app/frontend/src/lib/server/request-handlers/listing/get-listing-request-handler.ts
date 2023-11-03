import { type ApiRequest } from '@echo/api/types/api-request'
import { type CreateListingRequest } from '@echo/api/types/requests/create-listing-request'
import { type ListingResponse } from '@echo/api/types/responses/listing-response'
import { assertListingExists } from '@echo/frontend/lib/server/helpers/listing/assert/assert-listing-exists'
import { guarded_findListingById } from '@echo/frontend/lib/server/helpers/listing/guarded_find-listing-by-id'
import { NextResponse } from 'next/server'

export async function getListingRequestHandler(_req: ApiRequest<CreateListingRequest>, listingId: string) {
  const listing = await guarded_findListingById(listingId)
  assertListingExists(listing, listingId)
  return NextResponse.json<ListingResponse>({ listing })
}
