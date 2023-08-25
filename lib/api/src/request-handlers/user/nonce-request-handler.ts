import { getUserFromSession } from '../../helpers/auth/get-user-from-session'
import { assertAllowedMethods } from '../../helpers/error/assert-allowed-methods'
import { setUserNonce } from '../../helpers/user/set-user-nonce'
import { ApiRequest, ApiResponse, NonceResponse } from '@echo/api-public'
import { AuthOptions } from 'next-auth'

export async function nonceRequestHandler(
  req: ApiRequest<never>,
  res: ApiResponse<NonceResponse>,
  authOptions: AuthOptions
) {
  assertAllowedMethods(req, ['GET'])
  const user = await getUserFromSession(req, res, authOptions)
  const nonce = await setUserNonce(user)
  return res.status(200).json({ nonce })
}
