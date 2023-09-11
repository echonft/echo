import type { ApiRequest } from '@echo/api/types'
import { handleRequest } from '@server/request-handlers/handle-request'
import { getUserNftsRequestHandler } from '@server/request-handlers/user/get-user-nfts-request-handler'

export async function GET(request: ApiRequest<never>, { params }: { params: { username: string } }) {
  return await handleRequest(request, getUserNftsRequestHandler, params.username)
}
