import { getNftCollectionNftsRouteHandler } from '@echo/api'
import { ApiRequest } from '@echo/api-public'

export async function GET(request: ApiRequest<never>, { params }: { params: { slug: string } }) {
  return await getNftCollectionNftsRouteHandler(request, params.slug)
}
