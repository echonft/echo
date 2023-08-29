import { handleRequest } from '../../request-handlers/handle-request'
import { nftCollectionRequestHandler } from '../../request-handlers/nft-collection/nft-collection-request-handler'
import {
  ApiRequest,
  ApiResponse,
  GetNftCollectionNftsResponse,
  GetNftCollectionResponse,
  NftCollectionRequest
} from '@echo/api-public'

export function nftCollectionRouteHandler(
  req: ApiRequest<never, NftCollectionRequest>,
  res: ApiResponse<GetNftCollectionResponse | GetNftCollectionNftsResponse>
) {
  return handleRequest(req, res, nftCollectionRequestHandler)
}
