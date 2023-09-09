import { handleRequest } from '../../../../../lib/server/request-handlers/handle-request'
import { getUserNftsRequestHandler } from '../../../../../lib/server/request-handlers/user/get-user-nfts-request-handler'
import { ApiRequest } from '@echo/api'

export async function GET(request: ApiRequest<never>, { params }: { params: { username: string } }) {
  return await handleRequest(request, getUserNftsRequestHandler, params.username)
}
