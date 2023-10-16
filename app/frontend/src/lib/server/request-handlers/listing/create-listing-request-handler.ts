import type { ApiRequest } from '@echo/api/types/api-request'
import type { CreateListingRequest } from '@echo/api/types/requests/create-listing-request'
import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import type { ListingItem } from '@echo/model/types/listing-item'
import { BadRequestError } from '@server/helpers/error/bad-request-error'
import { createListing } from '@server/helpers/listing/create-listing'
import { getListingItems } from '@server/helpers/listing/get-listing-items'
import { getListingTargets } from '@server/helpers/listing/get-listing-targets'
import { assertNftOwner } from '@server/helpers/nft/assert-nft-owner'
import { getUserFromRequest } from '@server/helpers/request/get-user-from-request'
import { createListingSchema } from '@server/validators/create-listing-schema'
import { NextResponse } from 'next/server'
import { forEach } from 'ramda'

export async function createListingRequestHandler(req: ApiRequest<CreateListingRequest>) {
  const requestBody = await req.json()
  const { items, target } = parseCreateListingRequest(requestBody)
  const creator = await getUserFromRequest(req)
  const listingItems = await getListingItems(items)
  const listingTargets = await getListingTargets([target])
  // make sure the creator is the owner of every item
  forEach((item: ListingItem) => {
    assertNftOwner(item.nft, creator.username)
  }, listingItems)
  const listing = await createListing(listingItems, listingTargets)
  return NextResponse.json<ListingResponse>({ listing })
}

function parseCreateListingRequest(request: CreateListingRequest) {
  try {
    return createListingSchema.parse(request)
  } catch (e) {
    throw new BadRequestError(`error parsing create listing request ${JSON.stringify(request)}`, e)
  }
}
