import { type ApiRequest } from '@echo/api/types/api-request'
import { type ListingsResponse } from '@echo/api/types/responses/listings-response'
import { guarded_getAllListings } from '@echo/frontend/lib/server/helpers/listing/guarded_get-all-listings'
import { guarded_parseConstraintsQuery } from '@echo/frontend/lib/server/helpers/request/guarded_parse-constraints-query'
import { guarded_parseListingFiltersQuery } from '@echo/frontend/lib/server/helpers/request/guarded_parse-listing-filters-query'
import { NextResponse } from 'next/server'

export async function getAllListingsRequestHandler(req: ApiRequest<never>) {
  const constraints = guarded_parseConstraintsQuery(req)
  const filters = guarded_parseListingFiltersQuery(req)
  const listings = await guarded_getAllListings(filters, constraints)
  return NextResponse.json<ListingsResponse>({ listings })
}
