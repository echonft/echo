import { type ApiRequest } from '@echo/api/types/api-request'
import { type RemoveWalletRequest } from '@echo/api/types/requests/remove-wallet-request'
import { BadRequestError } from '@echo/frontend/lib/server/helpers/error/bad-request-error'
import { getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/get-user-from-request'
import { emptyResponse } from '@echo/frontend/lib/server/helpers/response/empty-response'
import { removeUserWallet } from '@echo/frontend/lib/server/helpers/user/remove-user-wallet'
import { updateUserNfts } from '@echo/frontend/lib/server/helpers/user/update-user-nfts'
import { removeWalletSchema } from '@echo/frontend/lib/server/validators/remove-wallet-schema'

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
