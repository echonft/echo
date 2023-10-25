import { type ApiRequest } from '@echo/api/types/api-request'
import { type ListingsResponse } from '@echo/api/types/responses/listings-response'
import { assertCollection } from '@echo/frontend/lib/server/helpers/collection/assert-collection'
import { getCollectionBySlug } from '@echo/frontend/lib/server/helpers/collection/get-collection-by-slug'
import { getCollectionListings } from '@echo/frontend/lib/server/helpers/listing/get-collection-listings'
import { parseConstraintsQuery } from '@echo/frontend/lib/server/helpers/request/parse-constraints-query'
import { parseListingFiltersQuery } from '@echo/frontend/lib/server/helpers/request/parse-listing-filters-query'
import { NextResponse } from 'next/server'

export async function getCollectionListingsRequestHandler(req: ApiRequest<never>, slug: string) {
  const constraints = parseConstraintsQuery(req)
  const filters = parseListingFiltersQuery(req)
  const collection = await getCollectionBySlug(slug)
  assertCollection(collection)
  const listings = await getCollectionListings(collection.id, filters, constraints)
  return NextResponse.json<ListingsResponse>({ listings })
}
