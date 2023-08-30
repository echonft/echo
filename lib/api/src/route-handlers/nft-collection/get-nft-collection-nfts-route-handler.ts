import { handleRequest } from '../../request-handlers/handle-request'
import { getNftCollectionNftsRequestHandler } from '../../request-handlers/nft-collection/get-nft-collection-nfts-request-handler'
import { ApiRequest } from '@echo/api-public'

export async function getNftCollectionNftsRouteHandler(req: ApiRequest<never>, slug: string) {
  return await handleRequest(req, getNftCollectionNftsRequestHandler, slug)
}
