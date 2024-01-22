import { type ApiRequest } from '@echo/api/types/api-request'
import { type AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import { findNonceForUser } from '@echo/firestore/crud/nonce/find-nonce-for-user'
import { findUserByUsername } from '@echo/firestore/crud/user/find-user-by-username'
import { addWallet } from '@echo/firestore/crud/wallet/add-wallet'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { getSiweMessage } from '@echo/frontend/lib/helpers/auth/get-siwe-message'
import { verifySiweMessage } from '@echo/frontend/lib/helpers/auth/verify-siwe-message'
import { guardAsyncFn, guardFn } from '@echo/frontend/lib/helpers/error/guard'
import { emptyResponse } from '@echo/frontend/lib/helpers/response/empty-response'
import { guarded_assertNonce } from '@echo/frontend/lib/helpers/user/assert/guarded_assert-nonce'
import { guarded_assertUserExists } from '@echo/frontend/lib/helpers/user/assert/guarded_assert-user-exists'
import { addWalletSchema } from '@echo/frontend/lib/validators/add-wallet-schema'
import type { AuthUser } from '@echo/model/types/auth-user'

export async function addWalletRequestHandler(user: AuthUser, req: ApiRequest<AddWalletRequest>) {
  const requestBody = await guardAsyncFn(
    (req: ApiRequest<AddWalletRequest>) => req.json(),
    ErrorStatus.BAD_REQUEST
  )(req)
  const { message, wallet, signature } = guardFn(
    (requestBody) => addWalletSchema.parse(requestBody),
    ErrorStatus.BAD_REQUEST
  )(requestBody)
  const siweMessage = guardFn(getSiweMessage, ErrorStatus.BAD_REQUEST)(message)
  const verifiedMessage = await guardAsyncFn(verifySiweMessage, ErrorStatus.BAD_REQUEST)(signature, siweMessage)
  const foundUser = await guardAsyncFn(findUserByUsername, ErrorStatus.SERVER_ERROR)(user.username)
  guarded_assertUserExists(foundUser, user.username)
  const nonce = await guardAsyncFn(findNonceForUser, ErrorStatus.SERVER_ERROR)(foundUser.id)
  guarded_assertNonce(nonce, verifiedMessage)
  await guardAsyncFn(addWallet, ErrorStatus.SERVER_ERROR)(foundUser.id, wallet)
  return emptyResponse()
}
