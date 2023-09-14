import type { ApiRequest } from '@echo/api/types/base/api-request'
import { getCollectionRequestHandler } from '@server/request-handlers/collection/get-collection-request-handler'
import { handleRequest } from '@server/request-handlers/handle-request'

export async function GET(request: ApiRequest<never>, { params }: { params: { slug: string } }) {
  return await handleRequest(request, getCollectionRequestHandler, params.slug)
}
