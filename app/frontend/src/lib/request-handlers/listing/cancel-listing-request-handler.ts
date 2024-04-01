import { type ApiRequest } from '@echo/api/types/api-request'
import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import { cancelListing } from '@echo/firestore/crud/listing/cancel-listing'
import { findListingById } from '@echo/firestore/crud/listing/find-listing-by-id'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn } from '@echo/frontend/lib/helpers/error/guard'
import { assertListing } from '@echo/frontend/lib/helpers/listing/assert/assert-listing'
import { assertListingCreatorIs } from '@echo/frontend/lib/helpers/listing/assert/assert-listing-creator-is'
import { assertListingState } from '@echo/frontend/lib/helpers/listing/assert/assert-listing-state'
import { LISTING_STATE_CANCELLED } from '@echo/model/constants/listing-states'
import type { AuthUser } from '@echo/model/types/auth-user'
import { NextResponse } from 'next/server'

export async function cancelListingRequestHandler(user: AuthUser, _req: ApiRequest<never>, params: { id: string }) {
  const { id } = params
  const listing = await guardAsyncFn(findListingById, ErrorStatus.SERVER_ERROR)(id)
  assertListing(listing)
  assertListingState(listing, LISTING_STATE_CANCELLED)
  assertListingCreatorIs(listing, user.username)
  const updatedListing = await guardAsyncFn(cancelListing, ErrorStatus.SERVER_ERROR)(id)
  return NextResponse.json<ListingResponse>({ listing: updatedListing })
}
