import { type ApiRequest } from '@echo/api/types/api-request'
import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import { cancelListing } from '@echo/firestore/crud/listing/cancel-listing'
import { findListingById } from '@echo/firestore/crud/listing/find-listing-by-id'
import { getAuthUser } from '@echo/frontend/lib/helpers/auth/get-auth-user'
import { ErrorStatus } from '@echo/frontend/lib/server/constants/error-status'
import { guardAsyncFn } from '@echo/frontend/lib/server/helpers/error/guard'
import { guarded_assertListing } from '@echo/frontend/lib/server/helpers/listing/assert/guarded_assert-listing'
import { guarded_assertListingCreatorIs } from '@echo/frontend/lib/server/helpers/listing/assert/guarded_assert-listing-creator-is'
import { guarded_assertListingState } from '@echo/frontend/lib/server/helpers/listing/assert/guarded_assert-listing-state'
import { guarded_assertAuthUser } from '@echo/frontend/lib/server/helpers/request/assert/guarded_assert-auth-user'
import { LISTING_STATE_CANCELLED } from '@echo/model/constants/listing-states'
import { NextResponse } from 'next/server'

export async function cancelListingRequestHandler(req: ApiRequest<never>, listingId: string) {
  const listing = await guardAsyncFn(findListingById, ErrorStatus.SERVER_ERROR)(listingId)
  guarded_assertListing(listing)
  guarded_assertListingState(listing, LISTING_STATE_CANCELLED)
  const user = await getAuthUser(req)
  guarded_assertAuthUser(user)
  guarded_assertListingCreatorIs(listing, user.username)
  const updatedListing = await guardAsyncFn(cancelListing, ErrorStatus.SERVER_ERROR)(listingId)
  return NextResponse.json<ListingResponse>({ listing: updatedListing })
}
