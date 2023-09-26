import type { ApiRequest } from '@echo/api/types/base/api-request'
import type { CreateListingRequest } from '@echo/api/types/requests/create-listing-request'
import type { GetListingResponse } from '@echo/api/types/responses/get-listing-response'
import type { FirestoreListingItem } from '@echo/firestore/types/model/listing/firestore-listing-item'
import { BadRequestError } from '@server/helpers/error/bad-request-error'
import { createListing } from '@server/helpers/listing/create-listing'
import { getListingItems } from '@server/helpers/listing/get-listing-items'
import { getListingTargets } from '@server/helpers/listing/get-listing-targets'
import { assertNftOwner } from '@server/helpers/nft/assert-nft-owner'
import { getUserFromRequest } from '@server/helpers/request/get-user-from-request'
import { mapListingToResponse } from '@server/mappers/to-response/map-listing-to-response'
import { createListingSchema } from '@server/validators/create-listing-schema'
import { NextResponse } from 'next/server'
import { forEach } from 'ramda'

export async function createListingRequestHandler(req: ApiRequest<CreateListingRequest>) {
  const requestBody = await req.json()
  const { items, targets } = parseCreateListingRequest(requestBody)
  const creator = await getUserFromRequest(req)
  const listingItems = await getListingItems(items)
  const listingTargets = await getListingTargets(targets)
  // make sure the creator is the owner of every item
  forEach((item: FirestoreListingItem) => {
    assertNftOwner(item.nft, creator.name)
  }, listingItems)
  const listing = await createListing(listingItems, listingTargets)
  return NextResponse.json<GetListingResponse>({ listing: mapListingToResponse(listing) })
}

function parseCreateListingRequest(request: CreateListingRequest) {
  try {
    return createListingSchema.parse(request)
  } catch (e) {
    throw new BadRequestError(`error parsing create listing request ${JSON.stringify(request)}`, e)
  }
}
