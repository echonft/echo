import { getUserListings } from '../../helpers/listing/get-user-listings'
import { parseConstraintsQuery } from '../../helpers/request/parse-constraints-query'
import { parseListingFiltersQuery } from '../../helpers/request/parse-listing-filters-query'
import { assertUser } from '../../helpers/user/assert-user'
import { mapListing } from '../../mappers/to-response/map-listing'
import { ApiRequest, GetListingsResponse } from '@echo/api'
import { findUserByUsername } from '@echo/firestore/src/crud/user/find-user-by-username'
import { NextResponse } from 'next/server'
import { map } from 'ramda'

export async function getUserListingsRequestHandler(req: ApiRequest<never>, username: string) {
  const constraints = parseConstraintsQuery(req)
  const filters = parseListingFiltersQuery(req)
  const user = await findUserByUsername(username)
  assertUser(user)
  const listings = await getUserListings(user.id, filters, constraints)
  return NextResponse.json<GetListingsResponse>({ listings: map(mapListing, listings) })
}
