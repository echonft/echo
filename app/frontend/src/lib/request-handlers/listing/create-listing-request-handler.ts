import { type ApiRequest } from '@echo/api/types/api-request'
import { type CreateListingRequest } from '@echo/api/types/requests/create-listing-request'
import { type ListingResponse } from '@echo/api/types/responses/listing-response'
import { addListing } from '@echo/firestore/crud/listing/add-listing'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn, guardFn } from '@echo/frontend/lib/helpers/error/guard'
import { getListingTargetFromRequest } from '@echo/frontend/lib/helpers/listing/get-listing-target-from-request'
import { assertNftsOwner } from '@echo/frontend/lib/helpers/nft/assert/assert-nfts-owner'
import { getNftsFromIndexes } from '@echo/frontend/lib/helpers/nft/get-nfts-from-indexes'
import { createListingSchema } from '@echo/frontend/lib/validators/create-listing-schema'
import { NextResponse } from 'next/server'
import type { User } from 'next-auth'

export async function createListingRequestHandler(user: User, req: ApiRequest<CreateListingRequest>) {
  const requestBody = await guardAsyncFn(
    (req: ApiRequest<CreateListingRequest>) => req.json(),
    ErrorStatus.BAD_REQUEST
  )(req)
  const { items, target, expiresAt } = guardFn(
    (requestBody) => createListingSchema.parse(requestBody),
    ErrorStatus.BAD_REQUEST
  )(requestBody)
  const listingItems = await guardAsyncFn(getNftsFromIndexes, ErrorStatus.SERVER_ERROR)(items)
  const listingTarget = await guardAsyncFn(getListingTargetFromRequest, ErrorStatus.SERVER_ERROR)(target)
  // make sure the creator is the owner of every item
  assertNftsOwner(listingItems, user.username)
  const { data } = await guardAsyncFn(
    addListing,
    ErrorStatus.SERVER_ERROR
  )({ items: listingItems, target: listingTarget, expiresAt })
  return NextResponse.json<ListingResponse>({ listing: data })
}
