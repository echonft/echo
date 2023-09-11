import type { ApiRequest, GetListingsResponse } from '@echo/api/types'
import { getNftListings } from '@server/helpers/listing/get-nft-listings'
import { parseConstraintsQuery } from '@server/helpers/request/parse-constraints-query'
import { parseListingFiltersQuery } from '@server/helpers/request/parse-listing-filters-query'
import { mapListing } from '@server/mappers/to-response/map-listing'
import { NextResponse } from 'next/server'
import { map } from 'ramda'

export async function getNftListingsRequestHandler(req: ApiRequest<never>, nftId: string) {
  const constraints = parseConstraintsQuery(req)
  const filters = parseListingFiltersQuery(req)
  const results = await getNftListings(nftId, filters, constraints)
  return NextResponse.json<GetListingsResponse>({ listings: map(mapListing, results) })
}
