import type { ApiRequest } from '@echo/api/types'
import { handleRequest } from '@server/request-handlers/handle-request'
import { getNftCollectionRequestHandler } from '@server/request-handlers/nft-collection/get-nft-collection-request-handler'

export async function GET(request: ApiRequest<never>, { params }: { params: { slug: string } }) {
  return await handleRequest(request, getNftCollectionRequestHandler, params.slug)
}
