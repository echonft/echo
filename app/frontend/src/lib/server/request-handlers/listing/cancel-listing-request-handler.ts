import { type ApiRequest } from '@echo/api/types/api-request'
import { assertListing } from '@echo/frontend/lib/server/helpers/listing/assert/assert-listing'
import { assertListingCreatorIs } from '@echo/frontend/lib/server/helpers/listing/assert/assert-listing-creator-is'
import { assertListingState } from '@echo/frontend/lib/server/helpers/listing/assert/assert-listing-state'
import { cancelListing } from '@echo/frontend/lib/server/helpers/listing/cancel-listing'
import { getListing } from '@echo/frontend/lib/server/helpers/listing/get-listing'
import { getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/get-user-from-request'
import { emptyResponse } from '@echo/frontend/lib/server/helpers/response/empty-response'

export async function cancelListingRequestHandler(req: ApiRequest<never>, listingId: string) {
  const listing = await getListing(listingId)
  assertListing(listing)
  assertListingState(listing, 'CANCELLED')
  const user = await getUserFromRequest(req)
  assertListingCreatorIs(listing, user.username)
  await cancelListing(listingId)
  return emptyResponse()
}
