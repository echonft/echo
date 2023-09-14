import type { ApiRequest } from '@echo/api/types/base/api-request'
import type { GetListingsResponse } from '@echo/api/types/responses/get-listings-response'
import { assertCollection } from '@server/helpers/collection/assert-collection'
import { getCollectionBySlug } from '@server/helpers/collection/get-collection-by-slug'
import { getCollectionListings } from '@server/helpers/listing/get-collection-listings'
import { parseConstraintsQuery } from '@server/helpers/request/parse-constraints-query'
import { parseListingFiltersQuery } from '@server/helpers/request/parse-listing-filters-query'
import { mapListingToResponse } from '@server/mappers/to-response/map-listing-to-response'
import { NextResponse } from 'next/server'
import { map } from 'ramda'

export async function getCollectionListingsRequestHandler(req: ApiRequest<never>, slug: string) {
  const constraints = parseConstraintsQuery(req)
  const filters = parseListingFiltersQuery(req)
  const collection = await getCollectionBySlug(slug)
  assertCollection(collection)
  const results = await getCollectionListings(collection.id, filters, constraints)
  return NextResponse.json<GetListingsResponse>({ listings: map(mapListingToResponse, results) })
}
