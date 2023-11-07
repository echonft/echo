import { type ListingResponse } from '@echo/api/types/responses/listing-response'
import { findListingById } from '@echo/firestore/crud/listing/find-listing-by-id'
import { ErrorStatus } from '@echo/frontend/lib/server/constants/error-status'
import { guardAsyncFn } from '@echo/frontend/lib/server/helpers/error/guard'
import { guarded_assertListingExists } from '@echo/frontend/lib/server/helpers/listing/assert/guarded_assert-listing-exists'
import { NextResponse } from 'next/server'

export async function getListingRequestHandler(listingId: string) {
  const listing = await guardAsyncFn(findListingById, ErrorStatus.SERVER_ERROR)(listingId)
  guarded_assertListingExists(listing, listingId)
  return NextResponse.json<ListingResponse>({ listing })
}
