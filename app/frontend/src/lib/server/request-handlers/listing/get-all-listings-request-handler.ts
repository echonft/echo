import type { ApiRequest } from '@echo/api/types/api-request'
import { GetListingsResponse } from '@echo/api/types/responses/get-listings-response'
import { getAllListings } from '@echo/firestore/crud/listing/get-all-listings'
import { parseConstraintsQuery } from '@server/helpers/request/parse-constraints-query'
import { parseListingFiltersQuery } from '@server/helpers/request/parse-listing-filters-query'
import { NextResponse } from 'next/server'

export async function getAllListingsRequestHandler(req: ApiRequest<never>) {
  const constraints = parseConstraintsQuery(req)
  const filters = parseListingFiltersQuery(req)
  const listings = await getAllListings(filters, constraints)
  return NextResponse.json<GetListingsResponse>({ listings })
}
