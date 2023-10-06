import type { ApiRequest } from '@echo/api/types/base/api-request'
import type { RemoveWalletRequest } from '@echo/api/types/requests/remove-wallet-request'
import { BadRequestError } from '@server/helpers/error/bad-request-error'
import { getUserFromRequest } from '@server/helpers/request/get-user-from-request'
import { emptyResponse } from '@server/helpers/response/empty-response'
import { removeUserWallet } from '@server/helpers/user/remove-user-wallet'
import { updateUserNfts } from '@server/helpers/user/update-user-nfts'
import { removeWalletSchema } from '@server/validators/remove-wallet-schema'

export async function removeWalletRequestHandler(req: ApiRequest<RemoveWalletRequest>) {
  const requestBody = await req.json()
  const { wallet } = parseRemoveWalletRequest(requestBody)
  const user = await getUserFromRequest(req)
  await removeUserWallet(user.id, wallet)
  await updateUserNfts(user, wallet)
  return emptyResponse()
}

function parseRemoveWalletRequest(request: RemoveWalletRequest) {
  try {
    return removeWalletSchema.parse(request)
  } catch (e) {
    throw new BadRequestError(`error parsing remove wallet request ${JSON.stringify(request)}`, e)
  }
}
