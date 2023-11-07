import { type ApiRequest } from '@echo/api/types/api-request'
import { type ListingsResponse } from '@echo/api/types/responses/listings-response'
import { getListingsForNft } from '@echo/firestore/crud/listing/get-listings-for-nft'
import { ErrorStatus } from '@echo/frontend/lib/server/constants/error-status'
import { guardAsyncFn, guardFn } from '@echo/frontend/lib/server/helpers/error/guard'
import { parseConstraintsQuery } from '@echo/frontend/lib/server/helpers/request/parse-constraints-query'
import { parseListingFiltersQuery } from '@echo/frontend/lib/server/helpers/request/parse-listing-filters-query'
import { NextResponse } from 'next/server'

export async function getNftListingsRequestHandler(req: ApiRequest<never>, nftId: string) {
  const constraints = guardFn(parseConstraintsQuery, ErrorStatus.BAD_REQUEST)(req)
  const filters = guardFn(parseListingFiltersQuery, ErrorStatus.BAD_REQUEST)(req)
  const listings = await guardAsyncFn(getListingsForNft, ErrorStatus.SERVER_ERROR)(nftId, filters, constraints)
  return NextResponse.json<ListingsResponse>({ listings })
}
