import { type ApiRequest } from '@echo/api/types/api-request'
import { type ListingsResponse } from '@echo/api/types/responses/listings-response'
import { assertCollectionExists } from '@echo/frontend/lib/server/helpers/collection/assert-collection-exists'
import { guarded_findCollectionBySlug } from '@echo/frontend/lib/server/helpers/collection/guarded_find-collection-by-slug'
import { guarded_getCollectionListings } from '@echo/frontend/lib/server/helpers/listing/guarded_get-collection-listings'
import { parseConstraintsQuery } from '@echo/frontend/lib/server/helpers/request/parse-constraints-query'
import { parseListingFiltersQuery } from '@echo/frontend/lib/server/helpers/request/parse-listing-filters-query'
import { NextResponse } from 'next/server'

export async function getCollectionListingsRequestHandler(req: ApiRequest<never>, slug: string) {
  const constraints = parseConstraintsQuery(req)
  const filters = parseListingFiltersQuery(req)
  const collection = await guarded_findCollectionBySlug(slug)
  assertCollectionExists(collection, slug)
  const listings = await guarded_getCollectionListings(collection.id, filters, constraints)
  return NextResponse.json<ListingsResponse>({ listings })
}
