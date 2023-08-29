import { assertNftCollection } from '../../helpers/nft-collection/assert-nft-collection'
import { getNftCollectionBySlug } from '../../helpers/nft-collection/get-nft-collection-by-slug'
import { mapNftCollection } from '../../mappers/to-response/map-nft-collection'
import { ApiResponse, GetNftCollectionResponse } from '@echo/api-public'

export async function handleGetNftCollection(slug: string, res: ApiResponse<GetNftCollectionResponse>) {
  const nftCollection = await getNftCollectionBySlug(slug)
  assertNftCollection(nftCollection)
  return res.status(200).json({ collection: mapNftCollection(nftCollection!) })
}
