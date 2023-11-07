import { type ApiRequest } from '@echo/api/types/api-request'
import { type CreateListingRequest } from '@echo/api/types/requests/create-listing-request'
import { type ListingResponse } from '@echo/api/types/responses/listing-response'
import { BadRequestError } from '@echo/frontend/lib/server/helpers/error/bad-request-error'
import { guarded_addListing } from '@echo/frontend/lib/server/helpers/listing/guarded_add-listing'
import { guarded_getListingItemsFromRequests } from '@echo/frontend/lib/server/helpers/listing/guarded_get-listing-items-from-requests'
import { guarded_getListingTargetsFromRequests } from '@echo/frontend/lib/server/helpers/listing/guarded_get-listing-targets-from-requests'
import { guarded_assertNftOwner } from '@echo/frontend/lib/server/helpers/nft/assert/guarded_assert-nft-owner'
import { guarded_getResquestBody } from '@echo/frontend/lib/server/helpers/request/guarded_get-resquest-body'
import { guarded_getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/guarded_get-user-from-request'
import { createListingSchema } from '@echo/frontend/lib/server/validators/create-listing-schema'
import { type ListingItem } from '@echo/model/types/listing-item'
import { NextResponse } from 'next/server'
import { forEach } from 'ramda'

function guarded_parseCreateListingRequest(request: CreateListingRequest) {
  try {
    return createListingSchema.parse(request)
  } catch (e) {
    throw new BadRequestError(`error parsing create listing request ${JSON.stringify(request)}`, e)
  }
}

export async function createListingRequestHandler(req: ApiRequest<CreateListingRequest>) {
  const requestBody = await guarded_getResquestBody(req)
  const { items, target } = guarded_parseCreateListingRequest(requestBody)
  const creator = await guarded_getUserFromRequest(req)
  const listingItems = await guarded_getListingItemsFromRequests(items)
  const listingTargets = await guarded_getListingTargetsFromRequests([target])
  // make sure the creator is the owner of every item
  forEach((item: ListingItem) => {
    guarded_assertNftOwner(item.nft, creator.username)
  }, listingItems)
  const listing = await guarded_addListing(listingItems, listingTargets)
  return NextResponse.json<ListingResponse>({ listing })
}
