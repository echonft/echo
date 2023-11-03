import { type ApiRequest } from '@echo/api/types/api-request'
import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import { assertListing } from '@echo/frontend/lib/server/helpers/listing/assert/assert-listing'
import { assertListingCreatorIs } from '@echo/frontend/lib/server/helpers/listing/assert/assert-listing-creator-is'
import { assertListingState } from '@echo/frontend/lib/server/helpers/listing/assert/assert-listing-state'
import { cancelListing } from '@echo/frontend/lib/server/helpers/listing/cancel-listing'
import { getListing } from '@echo/frontend/lib/server/helpers/listing/get-listing'
import { getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/get-user-from-request'
import { NextResponse } from 'next/server'

export async function cancelListingRequestHandler(req: ApiRequest<never>, listingId: string) {
  const listing = await getListing(listingId)
  assertListing(listing)
  assertListingState(listing, 'CANCELLED')
  const user = await getUserFromRequest(req)
  assertListingCreatorIs(listing, user.username)
  const updatedListing = await cancelListing(listingId)
  return NextResponse.json<ListingResponse>({ listing: updatedListing })
}
