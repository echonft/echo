import type { ApiRequest } from '@echo/api/types/api-request'
import { assertListing } from '@server/helpers/listing/assert-listing'
import { assertListingCreatorIs } from '@server/helpers/listing/assert-listing-creator-is'
import { assertListingState } from '@server/helpers/listing/assert-listing-state'
import { cancelListing } from '@server/helpers/listing/cancel-listing'
import { getListing } from '@server/helpers/listing/get-listing'
import { getUserFromRequest } from '@server/helpers/request/get-user-from-request'
import { emptyResponse } from '@server/helpers/response/empty-response'

export async function cancelListingRequestHandler(req: ApiRequest<never>, listingId: string) {
  const listing = await getListing(listingId)
  assertListing(listing)
  assertListingState(listing, 'OPEN')
  const user = await getUserFromRequest(req)
  assertListingCreatorIs(listing, user.username)
  await cancelListing(listingId)
  return emptyResponse()
}
