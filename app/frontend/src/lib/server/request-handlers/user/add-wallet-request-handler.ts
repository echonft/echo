import { type ApiRequest } from '@echo/api/types/api-request'
import { type AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import { guarded_getSiweMessage } from '@echo/frontend/lib/server/helpers/auth/guarded_get-siwe-message'
import { guarded_verifySiweMessage } from '@echo/frontend/lib/server/helpers/auth/guarded_verify-siwe-message'
import { BadRequestError } from '@echo/frontend/lib/server/helpers/error/bad-request-error'
import { ForbiddenError } from '@echo/frontend/lib/server/helpers/error/forbidden-error'
import { guarded_getResquestBody } from '@echo/frontend/lib/server/helpers/request/guarded_get-resquest-body'
import { guarded_getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/guarded_get-user-from-request'
import { emptyResponse } from '@echo/frontend/lib/server/helpers/response/empty-response'
import { guarded_addWallet } from '@echo/frontend/lib/server/helpers/user/guarded_add-wallet'
import { guarded_findNonceForUser } from '@echo/frontend/lib/server/helpers/user/guarded_find-nonce-for-user'
import { guarded_updateUserNfts } from '@echo/frontend/lib/server/helpers/user/guarded_update-user-nfts'
import { addWalletSchema } from '@echo/frontend/lib/server/validators/add-wallet-schema'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'

function guarded_parseAddWalletRequest(request: AddWalletRequest) {
  try {
    return addWalletSchema.parse(request)
  } catch (e) {
    throw new BadRequestError(`error parsing add wallet request ${JSON.stringify(request)}`, e)
  }
}

export async function addWalletRequestHandler(req: ApiRequest<AddWalletRequest>) {
  const requestBody = await guarded_getResquestBody(req)
  const { message, wallet, signature } = guarded_parseAddWalletRequest(requestBody)
  const siweMessage = guarded_getSiweMessage(message)
  const { data, success } = await guarded_verifySiweMessage(signature, siweMessage)
  if (!success) {
    throw new BadRequestError(
      `could not validate siwe message ${JSON.stringify(siweMessage)} with signature ${signature}`
    )
  }
  const user = await guarded_getUserFromRequest(req)
  const nonce = await guarded_findNonceForUser(user.id)
  if (isNilOrEmpty(nonce)) {
    throw new ForbiddenError(`no nonce for user with id ${user.id}`)
  }
  if (nonce.expired) {
    throw new ForbiddenError(`nonce for user with id ${user.id} is expired. Please generate a new one`)
  }
  if (isNilOrEmpty(data.nonce) || data.nonce !== nonce.nonce) {
    throw new ForbiddenError(
      `nonce from request does not match nonce for user with id ${user.id}: ${data.nonce} != ${nonce.nonce}`
    )
  }
  await guarded_addWallet(user.id, wallet)
  await guarded_updateUserNfts(user, wallet)
  return emptyResponse()
}
