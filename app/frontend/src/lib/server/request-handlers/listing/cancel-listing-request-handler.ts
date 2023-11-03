import { type ApiRequest } from '@echo/api/types/api-request'
import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import { assertListing } from '@echo/frontend/lib/server/helpers/listing/assert/assert-listing'
import { assertListingCreatorIs } from '@echo/frontend/lib/server/helpers/listing/assert/assert-listing-creator-is'
import { assertListingState } from '@echo/frontend/lib/server/helpers/listing/assert/assert-listing-state'
import { guarded_cancelListing } from '@echo/frontend/lib/server/helpers/listing/guarded_cancel-listing'
import { guarded_findListingById } from '@echo/frontend/lib/server/helpers/listing/guarded_find-listing-by-id'
import { getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/get-user-from-request'
import { NextResponse } from 'next/server'

export async function cancelListingRequestHandler(req: ApiRequest<never>, listingId: string) {
  const listing = await guarded_findListingById(listingId)
  assertListing(listing)
  assertListingState(listing, 'CANCELLED')
  const user = await getUserFromRequest(req)
  assertListingCreatorIs(listing, user.username)
  const updatedListing = await guarded_cancelListing(listingId)
  return NextResponse.json<ListingResponse>({ listing: updatedListing })
}
