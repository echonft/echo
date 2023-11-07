import { type ApiRequest } from '@echo/api/types/api-request'
import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import { guarded_assertListing } from '@echo/frontend/lib/server/helpers/listing/assert/guarded_assert-listing'
import { guarded_assertListingCreatorIs } from '@echo/frontend/lib/server/helpers/listing/assert/guarded_assert-listing-creator-is'
import { guarded_assertListingState } from '@echo/frontend/lib/server/helpers/listing/assert/guarded_assert-listing-state'
import { guarded_cancelListing } from '@echo/frontend/lib/server/helpers/listing/guarded_cancel-listing'
import { guarded_findListingById } from '@echo/frontend/lib/server/helpers/listing/guarded_find-listing-by-id'
import { guarded_getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/guarded_get-user-from-request'
import { NextResponse } from 'next/server'

export async function cancelListingRequestHandler(req: ApiRequest<never>, listingId: string) {
  const listing = await guarded_findListingById(listingId)
  guarded_assertListing(listing)
  guarded_assertListingState(listing, 'CANCELLED')
  const user = await guarded_getUserFromRequest(req)
  guarded_assertListingCreatorIs(listing, user.username)
  const updatedListing = await guarded_cancelListing(listingId)
  return NextResponse.json<ListingResponse>({ listing: updatedListing })
}
