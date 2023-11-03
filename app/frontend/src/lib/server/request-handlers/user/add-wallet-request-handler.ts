import { type ApiRequest } from '@echo/api/types/api-request'
import { type AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import { findNonceForUser } from '@echo/firestore/crud/nonce/find-nonce-for-user'
import { addWallet } from '@echo/firestore/crud/wallet/add-wallet'
import { getUser } from '@echo/firestore/helpers/user/get-user'
import { ErrorStatus } from '@echo/frontend/lib/server/constants/error-status'
import { getSiweMessage } from '@echo/frontend/lib/server/helpers/auth/get-siwe-message'
import { verifySiweMessage } from '@echo/frontend/lib/server/helpers/auth/verify-siwe-message'
import { guardAsyncFn, guardFn } from '@echo/frontend/lib/server/helpers/error/guard'
import { guarded_assertAuthUser } from '@echo/frontend/lib/server/helpers/request/assert/guarded_assert-auth-user'
import { getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/get-user-from-request'
import { emptyResponse } from '@echo/frontend/lib/server/helpers/response/empty-response'
import { guarded_assertNonce } from '@echo/frontend/lib/server/helpers/user/assert/guarded_assert-nonce'
import { updateUserNfts } from '@echo/frontend/lib/server/helpers/user/update-user-nfts'
import { addWalletSchema } from '@echo/frontend/lib/server/validators/add-wallet-schema'

export async function addWalletRequestHandler(req: ApiRequest<AddWalletRequest>) {
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
  const user = await getUserFromRequest(req)
  guarded_assertAuthUser(user)
  const nonce = await guardAsyncFn(findNonceForUser, ErrorStatus.SERVER_ERROR)(user.id)
  guarded_assertNonce(nonce, verifiedMessage)
  await guardAsyncFn(addWallet, ErrorStatus.SERVER_ERROR)(user.id, wallet)
  await guardAsyncFn(updateUserNfts, ErrorStatus.SERVER_ERROR)(user, wallet)
  return emptyResponse()
}
