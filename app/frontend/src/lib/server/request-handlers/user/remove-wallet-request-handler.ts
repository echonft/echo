import type { ApiRequest } from '@echo/api/types/base/api-request'
import type { RemoveWalletRequest } from '@echo/api/types/requests/remove-wallet-request'
import { BadRequestError } from '@server/helpers/error/bad-request-error'
import { getUserFromRequest } from '@server/helpers/request/get-user-from-request'
import { emptyResponse } from '@server/helpers/response/empty-response'
import { assertUser } from '@server/helpers/user/assert-user'
import { getUserByUsername } from '@server/helpers/user/get-user-by-username'
import { removeUserWallet } from '@server/helpers/user/remove-user-wallet'
import { updateUserNftsIfNeeded } from '@server/helpers/user/update-user-nfts-if-needed'
import { removeWalletSchema } from '@server/validators/remove-wallet-schema'

export async function removeWalletRequestHandler(req: ApiRequest<RemoveWalletRequest>) {
  const requestBody = await req.json()
  const { wallet } = parseRemoveWalletRequest(requestBody)
  const user = await getUserFromRequest(req)
  await removeUserWallet(user.id, wallet)
  const firestoreUser = await getUserByUsername(user.name)
  assertUser(firestoreUser)
  await updateUserNftsIfNeeded(firestoreUser, wallet.chainId)
  return emptyResponse()
}

function parseRemoveWalletRequest(request: RemoveWalletRequest) {
  try {
    return removeWalletSchema.parse(request)
  } catch (e) {
    throw new BadRequestError(`error parsing remove wallet request ${JSON.stringify(request)}`, e)
  }
}
