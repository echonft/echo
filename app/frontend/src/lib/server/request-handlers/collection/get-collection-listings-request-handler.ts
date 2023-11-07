import { type ApiRequest } from '@echo/api/types/api-request'
import { type ListingsResponse } from '@echo/api/types/responses/listings-response'
import { guarded_assertCollectionExists } from '@echo/frontend/lib/server/helpers/collection/assert/guarded_assert-collection-exists'
import { guarded_findCollectionBySlug } from '@echo/frontend/lib/server/helpers/collection/guarded_find-collection-by-slug'
import { guarded_getCollectionListings } from '@echo/frontend/lib/server/helpers/listing/guarded_get-collection-listings'
import { guarded_parseConstraintsQuery } from '@echo/frontend/lib/server/helpers/request/guarded_parse-constraints-query'
import { guarded_parseListingFiltersQuery } from '@echo/frontend/lib/server/helpers/request/guarded_parse-listing-filters-query'
import { NextResponse } from 'next/server'

export async function getCollectionListingsRequestHandler(req: ApiRequest<never>, slug: string) {
  const constraints = guarded_parseConstraintsQuery(req)
  const filters = guarded_parseListingFiltersQuery(req)
  const collection = await guarded_findCollectionBySlug(slug)
  guarded_assertCollectionExists(collection, slug)
  const listings = await guarded_getCollectionListings(collection.id, filters, constraints)
  return NextResponse.json<ListingsResponse>({ listings })
}
