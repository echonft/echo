import { type ApiRequest } from '@echo/api/types/api-request'
import { type ListingsResponse } from '@echo/api/types/responses/listings-response'
import { guarded_getListingsForUser } from '@echo/frontend/lib/server/helpers/listing/guarded_get-listings-for-user'
import { parseConstraintsQuery } from '@echo/frontend/lib/server/helpers/request/parse-constraints-query'
import { parseListingFiltersQuery } from '@echo/frontend/lib/server/helpers/request/parse-listing-filters-query'
import { NextResponse } from 'next/server'

export async function getUserListingsRequestHandler(req: ApiRequest<never>, username: string) {
  const constraints = parseConstraintsQuery(req)
  const filters = parseListingFiltersQuery(req)
  const listings = await guarded_getListingsForUser(username, filters, constraints)
  return NextResponse.json<ListingsResponse>({ listings })
}
