import type { ApiRequest } from '@echo/api/types/base/api-request'
import type { GetNftsResponse } from '@echo/api/types/responses/get-nfts-response'
import { getCollectionNfts } from '@server/helpers/nft/get-collection-nfts'
import { parseConstraintsQuery } from '@server/helpers/request/parse-constraints-query'
import { mapNftToResponse } from '@server/mappers/to-response/map-nft-to-response'
import { NextResponse } from 'next/server'
import { map } from 'ramda'

export async function getCollectionNftsRequestHandler(req: ApiRequest<never>, slug: string) {
  const constraints = parseConstraintsQuery(req)
  const nfts = await getCollectionNfts(slug, constraints)
  return NextResponse.json<GetNftsResponse>({ nfts: map(mapNftToResponse, nfts) })
}
