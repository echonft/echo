import { type ApiRequest } from '@echo/api/types/api-request'
import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import { cancelListing } from '@echo/firestore/crud/listing/cancel-listing'
import { findListingById } from '@echo/firestore/crud/listing/find-listing-by-id'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn } from '@echo/frontend/lib/helpers/error/guard'
import { guarded_assertListing } from '@echo/frontend/lib/helpers/listing/assert/guarded_assert-listing'
import { guarded_assertListingCreatorIs } from '@echo/frontend/lib/helpers/listing/assert/guarded_assert-listing-creator-is'
import { guarded_assertListingState } from '@echo/frontend/lib/helpers/listing/assert/guarded_assert-listing-state'
import { LISTING_STATE_CANCELLED } from '@echo/model/constants/listing-states'
import type { AuthUser } from '@echo/model/types/auth-user'
import { NextResponse } from 'next/server'

export async function cancelListingRequestHandler(user: AuthUser, _req: ApiRequest<never>, params: { id: string }) {
  const { id } = params
  const listing = await guardAsyncFn(findListingById, ErrorStatus.SERVER_ERROR)(id)
  guarded_assertListing(listing)
  guarded_assertListingState(listing, LISTING_STATE_CANCELLED)
  guarded_assertListingCreatorIs(listing, user.username)
  const updatedListing = await guardAsyncFn(cancelListing, ErrorStatus.SERVER_ERROR)(id)
  return NextResponse.json<ListingResponse>({ listing: updatedListing })
}
