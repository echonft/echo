import type { ApiRequest } from '@echo/api/types/base/api-request'
import type { GetNftsResponse } from '@echo/api/types/responses/get-nfts-response'
import { getNftCollectionNfts } from '@server/helpers/nft/get-nft-collection-nfts'
import { parseConstraintsQuery } from '@server/helpers/request/parse-constraints-query'
import { mapNft } from '@server/mappers/to-response/map-nft'
import { NextResponse } from 'next/server'
import { map } from 'ramda'

export async function getNftCollectionNftsRequestHandler(req: ApiRequest<never>, slug: string) {
  const constraints = parseConstraintsQuery(req)
  const nfts = await getNftCollectionNfts(slug, constraints)
  return NextResponse.json<GetNftsResponse>({ nfts: map(mapNft, nfts) })
}
