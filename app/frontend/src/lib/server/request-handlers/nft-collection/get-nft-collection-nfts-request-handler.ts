import { getNftCollectionNfts } from '../../helpers/nft/get-nft-collection-nfts'
import { parseConstraintsQuery } from '../../helpers/request/parse-constraints-query'
import { mapNft } from '../../mappers/to-response/map-nft'
import { ApiRequest, GetNftsResponse } from '@echo/api'
import { NextResponse } from 'next/server'
import { map } from 'ramda'

export async function getNftCollectionNftsRequestHandler(req: ApiRequest<never>, slug: string) {
  const constraints = parseConstraintsQuery(req)
  const nfts = await getNftCollectionNfts(slug, constraints)
  return NextResponse.json<GetNftsResponse>({ nfts: map(mapNft, nfts) })
}
