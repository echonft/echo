import { nftCollectionRouteHandler } from '@echo/api'
import {
  ApiRequest,
  ApiResponse,
  GetNftCollectionNftsResponse,
  GetNftCollectionResponse,
  NftCollectionRequest
} from '@echo/api-public'

const collectionHanlder = async (
  req: ApiRequest<never, NftCollectionRequest>,
  res: ApiResponse<GetNftCollectionResponse | GetNftCollectionNftsResponse>
) => {
  await nftCollectionRouteHandler(req, res)
}

export default collectionHanlder
