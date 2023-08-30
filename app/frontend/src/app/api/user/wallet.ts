import { authOptions } from '../auth/[...nextauth]'
import { walletRouteHandler } from '@echo/api'
import { AddWalletRequest, ApiRequest, ApiResponse, EmptyResponse, RemoveWalletRequest } from '@echo/api-public'

const wallet = async (req: ApiRequest<AddWalletRequest | RemoveWalletRequest>, res: ApiResponse<EmptyResponse>) => {
  await walletRouteHandler(req, res, authOptions)
}

export default wallet
