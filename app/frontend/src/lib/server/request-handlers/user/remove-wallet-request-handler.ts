import { type ApiRequest } from '@echo/api/types/api-request'
import { type RemoveWalletRequest } from '@echo/api/types/requests/remove-wallet-request'
import { removeWallet } from '@echo/firestore/crud/wallet/remove-wallet'
import { ErrorStatus } from '@echo/frontend/lib/server/constants/error-status'
import { guardAsyncFn, guardFn } from '@echo/frontend/lib/server/helpers/error/guard'
import { guarded_assertAuthUser } from '@echo/frontend/lib/server/helpers/request/assert/guarded_assert-auth-user'
import { getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/get-user-from-request'
import { emptyResponse } from '@echo/frontend/lib/server/helpers/response/empty-response'
import { updateUserNfts } from '@echo/frontend/lib/server/helpers/user/update-user-nfts'
import { removeWalletSchema } from '@echo/frontend/lib/server/validators/remove-wallet-schema'

export async function removeWalletRequestHandler(req: ApiRequest<RemoveWalletRequest>) {
  const requestBody = await guardAsyncFn(
    (req: ApiRequest<RemoveWalletRequest>) => req.json(),
    ErrorStatus.BAD_REQUEST
  )(req)
  const { wallet } = guardFn(
    (requestBody) => removeWalletSchema.parse(requestBody),
    ErrorStatus.BAD_REQUEST
  )(requestBody)
  const user = await getUserFromRequest(req)
  guarded_assertAuthUser(user)
  await guardAsyncFn(removeWallet, ErrorStatus.SERVER_ERROR)(user.id, wallet)
  await guardAsyncFn(updateUserNfts, ErrorStatus.SERVER_ERROR)(user, wallet)
  return emptyResponse()
}
