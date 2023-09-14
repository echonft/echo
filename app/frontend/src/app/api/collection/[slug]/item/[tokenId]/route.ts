import type { ApiRequest } from '@echo/api/types/base/api-request'
import { handleRequest } from '@server/request-handlers/handle-request'
import { getNftRequestHandler } from '@server/request-handlers/nft/get-nft-request-handler'

export async function GET(request: ApiRequest<never>, { params }: { params: { slug: string; tokenId: string } }) {
  return await handleRequest(request, getNftRequestHandler, params.slug, params.tokenId)
}
