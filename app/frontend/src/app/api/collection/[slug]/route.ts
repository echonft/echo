import { getNftCollectionRouteHandler } from '@echo/api'
import { ApiRequest } from '@echo/api-public'

export async function GET(request: ApiRequest<never>, { params }: { params: { slug: string } }) {
  return await getNftCollectionRouteHandler(request, params.slug)
}
