import { type ApiRequest } from '@echo/api/types/api-request'
import { type ListingsResponse } from '@echo/api/types/responses/listings-response'
import { getNftListings } from '@server/helpers/listing/get-nft-listings'
import { parseConstraintsQuery } from '@server/helpers/request/parse-constraints-query'
import { parseListingFiltersQuery } from '@server/helpers/request/parse-listing-filters-query'
import { NextResponse } from 'next/server'

export async function getNftListingsRequestHandler(req: ApiRequest<never>, nftId: string) {
  const constraints = parseConstraintsQuery(req)
  const filters = parseListingFiltersQuery(req)
  const listings = await getNftListings(nftId, filters, constraints)
  return NextResponse.json<ListingsResponse>({ listings })
}
