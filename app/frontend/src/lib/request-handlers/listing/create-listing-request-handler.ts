import { type ApiRequest } from '@echo/api/types/api-request'
import { type CreateListingRequest } from '@echo/api/types/requests/create-listing-request'
import { type ListingResponse } from '@echo/api/types/responses/listing-response'
import { addListing } from '@echo/firestore/crud/listing/add-listing'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn, guardFn } from '@echo/frontend/lib/helpers/error/guard'
import { getListingTargetFromRequests } from '@echo/frontend/lib/helpers/listing/get-listing-target-from-requests'
import { assertNftsOwner } from '@echo/frontend/lib/helpers/nft/assert/assert-nfts-owner'
import { getNftsFromIndexes } from '@echo/frontend/lib/helpers/nft/get-nfts-from-indexes'
import { createListingSchema } from '@echo/frontend/lib/validators/create-listing-schema'
import type { AuthUser } from '@echo/model/types/auth-user'
import { NextResponse } from 'next/server'

export async function createListingRequestHandler(user: AuthUser, req: ApiRequest<CreateListingRequest>) {
  const requestBody = await guardAsyncFn(
    (req: ApiRequest<CreateListingRequest>) => req.json(),
    ErrorStatus.BAD_REQUEST
  )(req)
  const { items, target } = guardFn(
    (requestBody) => createListingSchema.parse(requestBody),
    ErrorStatus.BAD_REQUEST
  )(requestBody)
  const listingItems = await guardAsyncFn(getNftsFromIndexes, ErrorStatus.SERVER_ERROR)(items)
  const listingTarget = await guardAsyncFn(getListingTargetFromRequests, ErrorStatus.SERVER_ERROR)(target)
  // make sure the creator is the owner of every item
  assertNftsOwner(listingItems, user.username)
  const listing = await guardAsyncFn(
    addListing,
    ErrorStatus.SERVER_ERROR
  )({ items: listingItems, target: listingTarget })
  return NextResponse.json<ListingResponse>({ listing })
}
