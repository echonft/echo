import { getNftCollectionNfts } from '../../helpers/nft/get-nft-collection-nfts'
import { assertNftCollection } from '../../helpers/nft-collection/assert-nft-collection'
import { getNftCollectionBySlug } from '../../helpers/nft-collection/get-nft-collection-by-slug'
import { mapNft } from '../../mappers/to-response/map-nft'
import { ApiResponse, GetNftCollectionNftsResponse } from '@echo/api-public'
import { map, partialRight } from 'ramda'

export async function handleGetNftCollectionNfts(slug: string, res: ApiResponse<GetNftCollectionNftsResponse>) {
  const nftCollection = await getNftCollectionBySlug(slug)
  assertNftCollection(nftCollection)
  const nfts = await getNftCollectionNfts(nftCollection!)
  return res.status(200).json({ nfts: map(partialRight(mapNft, [nftCollection]), nfts) })
}
