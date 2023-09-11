import type { ApiRequest, GetNftsResponse } from '@echo/api/types'
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
