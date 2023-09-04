import { getNftCollectionNfts } from '../../helpers/nft/get-nft-collection-nfts'
import { assertNftCollection } from '../../helpers/nft-collection/assert-nft-collection'
import { getNftCollectionBySlug } from '../../helpers/nft-collection/get-nft-collection-by-slug'
import { mapNft } from '../../mappers/to-response/map-nft'
import { ApiRequest, GetNftCollectionNftsResponse } from '@echo/api'
import { NextResponse } from 'next/server'
import { map, partialRight } from 'ramda'

export async function getNftCollectionNftsRequestHandler(_req: ApiRequest<never>, slug: string) {
  const nftCollection = await getNftCollectionBySlug(slug)
  assertNftCollection(nftCollection)
  const nfts = await getNftCollectionNfts(nftCollection)
  return NextResponse.json<GetNftCollectionNftsResponse>({ nfts: map(partialRight(mapNft, [nftCollection]), nfts) })
}
