import { type ApiRequest } from '@echo/api/types/api-request'
import { type CreateListingRequest } from '@echo/api/types/requests/create-listing-request'
import { type ListingResponse } from '@echo/api/types/responses/listing-response'
import { addListing } from '@echo/firestore/crud/listing/add-listing'
import { ErrorStatus } from '@echo/frontend/lib/server/constants/error-status'
import { guardAsyncFn, guardFn } from '@echo/frontend/lib/server/helpers/error/guard'
import { guarded_assertItemsOwner } from '@echo/frontend/lib/server/helpers/item/assert/guarded_assert-items-owner'
import { getListingItemsFromRequests } from '@echo/frontend/lib/server/helpers/listing/get-listing-items-from-requests'
import { getListingTargetsFromRequests } from '@echo/frontend/lib/server/helpers/listing/get-listing-targets-from-requests'
import { guarded_assertAuthUser } from '@echo/frontend/lib/server/helpers/request/assert/guarded_assert-auth-user'
import { getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/get-user-from-request'
import { createListingSchema } from '@echo/frontend/lib/server/validators/create-listing-schema'
import { NextResponse } from 'next/server'

export async function createListingRequestHandler(req: ApiRequest<CreateListingRequest>) {
  const requestBody = await guardAsyncFn(
    (req: ApiRequest<CreateListingRequest>) => req.json(),
    ErrorStatus.BAD_REQUEST
  )(req)
  const { items, target } = guardFn(
    (requestBody) => createListingSchema.parse(requestBody),
    ErrorStatus.BAD_REQUEST
  )(requestBody)
  const user = await getUserFromRequest(req)
  guarded_assertAuthUser(user)
  const listingItems = await guardAsyncFn(getListingItemsFromRequests, ErrorStatus.SERVER_ERROR)(items)
  const listingTargets = await guardAsyncFn(getListingTargetsFromRequests, ErrorStatus.SERVER_ERROR)([target])
  // make sure the creator is the owner of every item
  guarded_assertItemsOwner(listingItems, user.username)
  const listing = await guardAsyncFn(addListing, ErrorStatus.SERVER_ERROR)(listingItems, listingTargets)
  return NextResponse.json<ListingResponse>({ listing })
}
