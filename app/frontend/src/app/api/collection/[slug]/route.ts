import { type ApiRequest } from '@echo/api/types/api-request'
import { getCollectionRequestHandler } from '@echo/frontend/lib/server/request-handlers/collection/get-collection-request-handler'
import { handleRequest } from '@echo/frontend/lib/server/request-handlers/handle-request'

export async function GET(request: ApiRequest<never>, { params }: { params: { slug: string } }) {
  return await handleRequest(request, getCollectionRequestHandler)(params.slug)
}
