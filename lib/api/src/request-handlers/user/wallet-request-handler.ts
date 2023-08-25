import { getUserFromSession } from '../../helpers/auth/get-user-from-session'
import { assertAllowedMethods } from '../../helpers/error/assert-allowed-methods'
import { handleAddWallet } from './handle-add-wallet'
import { handleRemoveWallet } from './handle-remove-wallet'
import { AddWalletRequest, ApiRequest, ApiResponse, EmptyResponse, RemoveWalletRequest } from '@echo/api-public'
import { AuthOptions } from 'next-auth'

export async function walletRequestHandler(
  req: ApiRequest<AddWalletRequest | RemoveWalletRequest>,
  res: ApiResponse<EmptyResponse>,
  authOptions: AuthOptions
) {
  assertAllowedMethods(req, ['PUT', 'DELETE'])
  const user = await getUserFromSession(req, res, authOptions)
  if (req.method === 'PUT') {
    return handleAddWallet(req as ApiRequest<AddWalletRequest>, res, user)
  } else {
    return handleRemoveWallet(req, res, user)
  }
}
