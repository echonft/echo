import { type ApiRequest } from '@echo/api/types/api-request'
import { type ListingsResponse } from '@echo/api/types/responses/listings-response'
import { guarded_getListingsForNft } from '@echo/frontend/lib/server/helpers/listing/guarded_get-listings-for-nft'
import { parseConstraintsQuery } from '@echo/frontend/lib/server/helpers/request/parse-constraints-query'
import { parseListingFiltersQuery } from '@echo/frontend/lib/server/helpers/request/parse-listing-filters-query'
import { NextResponse } from 'next/server'

export async function getNftListingsRequestHandler(req: ApiRequest<never>, nftId: string) {
  const constraints = parseConstraintsQuery(req)
  const filters = parseListingFiltersQuery(req)
  const listings = await guarded_getListingsForNft(nftId, filters, constraints)
  return NextResponse.json<ListingsResponse>({ listings })
}
