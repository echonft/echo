import { type ApiRequest } from '@echo/api/types/api-request'
import { type RemoveWalletRequest } from '@echo/api/types/requests/remove-wallet-request'
import { BadRequestError } from '@echo/frontend/lib/server/helpers/error/bad-request-error'
import { guarded_getResquestBody } from '@echo/frontend/lib/server/helpers/request/guarded_get-resquest-body'
import { guarded_getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/guarded_get-user-from-request'
import { emptyResponse } from '@echo/frontend/lib/server/helpers/response/empty-response'
import { guarded_removeWallet } from '@echo/frontend/lib/server/helpers/user/guarded_remove-wallet'
import { guarded_updateUserNfts } from '@echo/frontend/lib/server/helpers/user/guarded_update-user-nfts'
import { removeWalletSchema } from '@echo/frontend/lib/server/validators/remove-wallet-schema'

function guarded_parseRemoveWalletRequest(request: RemoveWalletRequest) {
  try {
    return removeWalletSchema.parse(request)
  } catch (e) {
    throw new BadRequestError(`error parsing remove wallet request ${JSON.stringify(request)}`, e)
  }
}

export async function removeWalletRequestHandler(req: ApiRequest<RemoveWalletRequest>) {
  const requestBody = await guarded_getResquestBody(req)
  const { wallet } = guarded_parseRemoveWalletRequest(requestBody)
  const user = await guarded_getUserFromRequest(req)
  await guarded_removeWallet(user.id, wallet)
  await guarded_updateUserNfts(user, wallet)
  return emptyResponse()
}
