import { authOptions } from '../auth/[...nextauth]'
import { nonceRouteHandler } from '@echo/api'
import { ApiRequest, ApiResponse, NonceResponse } from '@echo/api-public'

const nonce = async (req: ApiRequest<never>, res: ApiResponse<NonceResponse>) => {
  await nonceRouteHandler(req, res, authOptions)
}
export default nonce
