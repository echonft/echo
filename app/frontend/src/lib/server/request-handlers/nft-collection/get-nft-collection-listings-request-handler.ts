import type { ApiRequest, GetListingsResponse } from '@echo/api/types'
import { getNftCollectionListings } from '@server/helpers/listing/get-nft-collection-listings'
import { assertNftCollection } from '@server/helpers/nft-collection/assert-nft-collection'
import { getNftCollectionBySlug } from '@server/helpers/nft-collection/get-nft-collection-by-slug'
import { parseConstraintsQuery } from '@server/helpers/request/parse-constraints-query'
import { parseListingFiltersQuery } from '@server/helpers/request/parse-listing-filters-query'
import { mapListing } from '@server/mappers/to-response/map-listing'
import { NextResponse } from 'next/server'
import { map } from 'ramda'

export async function getNftCollectionListingsRequestHandler(req: ApiRequest<never>, slug: string) {
  const constraints = parseConstraintsQuery(req)
  const filters = parseListingFiltersQuery(req)
  const collection = await getNftCollectionBySlug(slug)
  assertNftCollection(collection)
  const results = await getNftCollectionListings(collection.id, filters, constraints)
  return NextResponse.json<GetListingsResponse>({ listings: map(mapListing, results) })
}
