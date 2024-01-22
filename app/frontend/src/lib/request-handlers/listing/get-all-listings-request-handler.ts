import { type ApiRequest } from '@echo/api/types/api-request'
import { type ListingsResponse } from '@echo/api/types/responses/listings-response'
import { getAllListings } from '@echo/firestore/crud/listing/get-all-listings'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn, guardFn } from '@echo/frontend/lib/helpers/error/guard'
import { parseConstraintsQuery } from '@echo/frontend/lib/helpers/request/parse-constraints-query'
import { parseListingFiltersQuery } from '@echo/frontend/lib/helpers/request/parse-listing-filters-query'
import { NextResponse } from 'next/server'

export async function getAllListingsRequestHandler(req: ApiRequest<never>) {
  const constraints = guardFn(parseConstraintsQuery, ErrorStatus.BAD_REQUEST)(req)
  const filters = guardFn(parseListingFiltersQuery, ErrorStatus.BAD_REQUEST)(req)
  const listings = await guardAsyncFn(getAllListings, ErrorStatus.SERVER_ERROR)(filters, constraints)
  return NextResponse.json<ListingsResponse>({ listings })
}
