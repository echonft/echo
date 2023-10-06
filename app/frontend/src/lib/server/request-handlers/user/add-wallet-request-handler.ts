import type { ApiRequest } from '@echo/api/types/base/api-request'
import type { AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import { findNonceForUser } from '@echo/firestore/crud/nonce/find-nonce-for-user'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { getSiweMessage } from '@server/helpers/auth/get-siwe-message'
import { verifySiweMessage } from '@server/helpers/auth/verify-siwe-message'
import { BadRequestError } from '@server/helpers/error/bad-request-error'
import { ForbiddenError } from '@server/helpers/error/forbidden-error'
import { getUserFromRequest } from '@server/helpers/request/get-user-from-request'
import { emptyResponse } from '@server/helpers/response/empty-response'
import { addUserWallet } from '@server/helpers/user/add-user-wallet'
import { updateUserNfts } from '@server/helpers/user/update-user-nfts'
import { addWalletSchema } from '@server/validators/add-wallet-schema'

export async function addWalletRequestHandler(req: ApiRequest<AddWalletRequest>) {
  const requestBody = await req.json()
  const { message, wallet, signature } = parseAddWalletRequest(requestBody)
  const siweMessage = getSiweMessage(message)
  const { data, success } = await verifySiweMessage(signature, siweMessage)
  if (!success) {
    throw new BadRequestError(
      `could not validate siwe message ${JSON.stringify(siweMessage)} with signature ${signature}`
    )
  }
  const user = await getUserFromRequest(req)
  const nonce = await findNonceForUser(user.id)
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
  await addUserWallet(user.id, wallet)
  await updateUserNfts(user, wallet)
  return emptyResponse()
}

function parseAddWalletRequest(request: AddWalletRequest) {
  try {
    return addWalletSchema.parse(request)
  } catch (e) {
    throw new BadRequestError(`error parsing add wallet request ${JSON.stringify(request)}`, e)
  }
}
