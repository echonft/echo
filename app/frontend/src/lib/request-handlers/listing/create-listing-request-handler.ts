import { type ApiRequest } from '@echo/api/types/api-request'
import { type CreateListingRequest } from '@echo/api/types/requests/create-listing-request'
import { type ListingResponse } from '@echo/api/types/responses/listing-response'
import { addListing } from '@echo/firestore/crud/listing/add-listing'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn, guardFn } from '@echo/frontend/lib/helpers/error/guard'
import { getListingTargetFromRequest } from '@echo/frontend/lib/helpers/listing/get-listing-target-from-request'
import { assertNftsOwner } from '@echo/frontend/lib/helpers/nft/assert/assert-nfts-owner'
import { getNftsFromIndexes } from '@echo/frontend/lib/helpers/nft/get-nfts-from-indexes'
import type { AuthRequestHandlerArgs } from '@echo/frontend/lib/types/request-handlers/auth-request-handler'
import { createListingSchema } from '@echo/frontend/lib/validators/create-listing-schema'
import { NextResponse } from 'next/server'

export async function createListingRequestHandler({ user, req, logger }: AuthRequestHandlerArgs<CreateListingRequest>) {
  const requestBody = await guardAsyncFn({
    fn: (req: ApiRequest<CreateListingRequest>) => req.json(),
    logger
  })(req)
  const { items, target, expiresAt } = guardFn({
    fn: (requestBody) => createListingSchema.parse(requestBody),
    logger
  })(requestBody)
  const listingItems = await guardAsyncFn({ fn: getNftsFromIndexes, status: ErrorStatus.SERVER_ERROR, logger })(items)
  const listingTarget = await guardAsyncFn({
    fn: getListingTargetFromRequest,
    status: ErrorStatus.SERVER_ERROR,
    logger
  })(target)
  // make sure the creator is the owner of every item
  assertNftsOwner(listingItems, user.username)
  const { data } = await guardAsyncFn({
    fn: addListing,
    status: ErrorStatus.SERVER_ERROR,
    logger
  })({ items: listingItems, target: listingTarget, expiresAt })
  return NextResponse.json<ListingResponse>({ listing: data })
}
