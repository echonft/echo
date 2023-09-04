import { handleRequest } from '../../../../lib/server/request-handlers/handle-request'
import { getNftCollectionRequestHandler } from '../../../../lib/server/request-handlers/nft-collection/get-nft-collection-request-handler'
import { ApiRequest } from '@echo/api'

export async function GET(request: ApiRequest<never>, { params }: { params: { slug: string } }) {
  return await handleRequest(request, getNftCollectionRequestHandler, params.slug)
}
