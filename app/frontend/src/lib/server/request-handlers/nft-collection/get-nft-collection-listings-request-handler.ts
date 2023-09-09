import { getNftCollectionListings } from '../../helpers/listing/get-nft-collection-listings'
import { assertNftCollection } from '../../helpers/nft-collection/assert-nft-collection'
import { getNftCollectionBySlug } from '../../helpers/nft-collection/get-nft-collection-by-slug'
import { parseConstraintsQuery } from '../../helpers/request/parse-constraints-query'
import { parseListingFiltersQuery } from '../../helpers/request/parse-listing-filters-query'
import { mapListing } from '../../mappers/to-response/map-listing'
import { ApiRequest, GetListingsResponse } from '@echo/api'
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
