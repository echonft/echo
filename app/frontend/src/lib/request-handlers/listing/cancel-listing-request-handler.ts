import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import { cancelListing } from '@echo/firestore/crud/listing/cancel-listing'
import { getListing } from '@echo/firestore/crud/listing/get-listing'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn } from '@echo/frontend/lib/helpers/error/guard'
import { assertListing } from '@echo/frontend/lib/helpers/listing/assert/assert-listing'
import { assertListingCreatorIs } from '@echo/frontend/lib/helpers/listing/assert/assert-listing-creator-is'
import { assertListingState } from '@echo/frontend/lib/helpers/listing/assert/assert-listing-state'
import type { AuthRequestHandlerArgsWithParams } from '@echo/frontend/lib/types/request-handlers/auth-request-handler'
import { LISTING_STATE_CANCELLED } from '@echo/model/constants/listing-states'
import type { WithSlug } from '@echo/model/types/with-slug'
import { NextResponse } from 'next/server'

export async function cancelListingRequestHandler({
  user,
  logger,
  params
}: AuthRequestHandlerArgsWithParams<WithSlug>) {
  const { slug } = params
  const listing = await guardAsyncFn({ fn: getListing, status: ErrorStatus.SERVER_ERROR, logger })(slug)
  assertListing(listing)
  assertListingState(listing, LISTING_STATE_CANCELLED)
  assertListingCreatorIs(listing, user.username)
  const updatedListing = await guardAsyncFn({ fn: cancelListing, status: ErrorStatus.SERVER_ERROR, logger })(slug)
  return NextResponse.json<ListingResponse>({ listing: updatedListing })
}
