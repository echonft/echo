import { handleRequest } from '../../../../lib/server/request-handlers/handle-request'
import { getAllCollectionsRequestHandler } from '../../../../lib/server/request-handlers/nft-collection/get-all-collections-request-handler'
import { ApiRequest } from '@echo/api'

export async function GET(request: ApiRequest<never>) {
  return await handleRequest(request, getAllCollectionsRequestHandler)
}
