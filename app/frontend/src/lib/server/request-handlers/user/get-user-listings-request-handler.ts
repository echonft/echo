import type { ApiRequest } from '@echo/api/types/base/api-request'
import type { GetListingsResponse } from '@echo/api/types/responses/get-listings-response'
import { getUserListings } from '@server/helpers/listing/get-user-listings'
import { parseConstraintsQuery } from '@server/helpers/request/parse-constraints-query'
import { parseListingFiltersQuery } from '@server/helpers/request/parse-listing-filters-query'
import { mapListingToResponse } from '@server/mappers/to-response/map-listing-to-response'
import { NextResponse } from 'next/server'
import { map } from 'ramda'

export async function getUserListingsRequestHandler(req: ApiRequest<never>, username: string) {
  const constraints = parseConstraintsQuery(req)
  const filters = parseListingFiltersQuery(req)
  const listings = await getUserListings(username, filters, constraints)
  return NextResponse.json<GetListingsResponse>({ listings: map(mapListingToResponse, listings) })
}
