import { type ApiRequest } from '@echo/api/types/api-request'
import { handleRequest } from '@echo/frontend/lib/server/request-handlers/handle-request'
import { getNftRequestHandler } from '@echo/frontend/lib/server/request-handlers/nft/get-nft-request-handler'

export async function GET(request: ApiRequest<never>, { params }: { params: { slug: string; tokenId: string } }) {
  return await handleRequest(request, getNftRequestHandler, params.slug, params.tokenId)
}
