import { type ApiRequest } from '@echo/api/types/api-request'
import { type RemoveWalletRequest } from '@echo/api/types/requests/remove-wallet-request'
import { findUserByUsername } from '@echo/firestore/crud/user/find-user-by-username'
import { removeWallet } from '@echo/firestore/crud/wallet/remove-wallet'
import { ErrorStatus } from '@echo/frontend/lib/server/constants/error-status'
import { guardAsyncFn, guardFn } from '@echo/frontend/lib/server/helpers/error/guard'
import { emptyResponse } from '@echo/frontend/lib/server/helpers/response/empty-response'
import { guarded_assertUserExists } from '@echo/frontend/lib/server/helpers/user/assert/guarded_assert-user-exists'
import { removeWalletSchema } from '@echo/frontend/lib/server/validators/remove-wallet-schema'
import type { AuthUser } from '@echo/model/types/auth-user'

export async function removeWalletRequestHandler(user: AuthUser, req: ApiRequest<RemoveWalletRequest>) {
  const requestBody = await guardAsyncFn(
    (req: ApiRequest<RemoveWalletRequest>) => req.json(),
    ErrorStatus.BAD_REQUEST
  )(req)
  const { wallet } = guardFn(
    (requestBody) => removeWalletSchema.parse(requestBody),
    ErrorStatus.BAD_REQUEST
  )(requestBody)
  const foundUser = await guardAsyncFn(findUserByUsername, ErrorStatus.SERVER_ERROR)(user.username)
  guarded_assertUserExists(foundUser, user.username)
  await guardAsyncFn(removeWallet, ErrorStatus.SERVER_ERROR)(foundUser.id, wallet)
  return emptyResponse()
}
