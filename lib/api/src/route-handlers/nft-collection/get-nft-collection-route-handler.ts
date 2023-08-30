import { handleRequest } from '../../request-handlers/handle-request'
import { getNftCollectionRequestHandler } from '../../request-handlers/nft-collection/get-nft-collection-request-handler'
import { ApiRequest } from '@echo/api-public'

export async function getNftCollectionRouteHandler(req: ApiRequest<never>, slug: string) {
  return await handleRequest(req, getNftCollectionRequestHandler, slug)
}
