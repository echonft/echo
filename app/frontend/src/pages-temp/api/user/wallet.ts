import { authOptions } from '../auth/[...nextauth]'
import { addWalletRouteHandler } from '@echo/api'
import { AddWalletRequest, ApiRequest, ApiResponse, EmptyResponse, RemoveWalletRequest } from '@echo/api-public'

const wallet = async (req: ApiRequest<AddWalletRequest | RemoveWalletRequest>, res: ApiResponse<EmptyResponse>) => {
  await addWalletRouteHandler(req, res, authOptions)
}

export default wallet
