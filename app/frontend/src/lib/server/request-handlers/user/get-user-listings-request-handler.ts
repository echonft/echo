import { parseConstraintsQuery } from '../../helpers/request/parse-constraints-query'
import { parseListingFiltersQuery } from '../../helpers/request/parse-listing-filters-query'
import { mapListing } from '../../mappers/to-response/map-listing'
import { ApiRequest, GetUserListingsResponse } from '@echo/api'
import { getListingsForCreator } from '@echo/firestore'
import { NextResponse } from 'next/server'
import { map } from 'ramda'

export async function getUserListingsRequestHandler(req: ApiRequest<never>, userId: string) {
  const constraints = parseConstraintsQuery(req)
  const filters = parseListingFiltersQuery(req)
  const listings = await getListingsForCreator(userId, filters, constraints)
  return NextResponse.json<GetUserListingsResponse>({ listings: map(mapListing, listings) })
}
