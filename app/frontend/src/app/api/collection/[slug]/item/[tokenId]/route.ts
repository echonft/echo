import { handleRequest } from '../../../../../../lib/server/request-handlers/handle-request'
import { getNftRequestHandler } from '../../../../../../lib/server/request-handlers/nft/get-nft-request-handler'
import { ApiRequest } from '@echo/api'

export async function GET(request: ApiRequest<never>, { params }: { params: { slug: string; tokenId: string } }) {
  return await handleRequest(request, getNftRequestHandler, params.slug, params.tokenId)
}
