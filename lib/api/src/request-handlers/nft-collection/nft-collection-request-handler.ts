import { assertAllowedMethods } from '../../helpers/error/assert-allowed-methods'
import { parseGetNftCollectionNftsRequest } from '../../helpers/nft-collection/parse-get-nft-collection-nfts-request'
import { parseNftCollectionRequest } from '../../helpers/nft-collection/parse-nft-collection-request'
import { handleGetNftCollection } from './handle-get-nft-collection'
import { handleGetNftCollectionNfts } from './handle-get-nft-collection-nfts'
import {
  ApiRequest,
  ApiResponse,
  GetNftCollectionNftsResponse,
  GetNftCollectionResponse,
  NftCollectionRequest
} from '@echo/api-public'
import { initialize } from '@echo/firestore'

export async function nftCollectionRequestHandler(
  req: ApiRequest<never, NftCollectionRequest>,
  res: ApiResponse<GetNftCollectionResponse | GetNftCollectionNftsResponse>
) {
  assertAllowedMethods(req, ['GET'])
  const { slug: slugParts } = parseNftCollectionRequest(req.query)
  initialize()
  if (slugParts.length === 1) {
    return handleGetNftCollection(slugParts[0]!, res)
  }
  if (slugParts.length === 2) {
    const slug = parseGetNftCollectionNftsRequest(req.query)
    return handleGetNftCollectionNfts(slug, res)
  }
}
