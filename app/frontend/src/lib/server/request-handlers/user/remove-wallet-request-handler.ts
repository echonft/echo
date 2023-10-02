import type { ApiRequest } from '@echo/api/types/base/api-request'
import type { RemoveWalletRequest } from '@echo/api/types/requests/remove-wallet-request'
import { mapWalletToWalletData } from '@echo/firestore/mappers/map-wallet-to-wallet-data'
import { BadRequestError } from '@server/helpers/error/bad-request-error'
import { getUserFromRequest } from '@server/helpers/request/get-user-from-request'
import { emptyResponse } from '@server/helpers/response/empty-response'
import { removeUserWallet } from '@server/helpers/user/remove-user-wallet'
import { updateUserNfts } from '@server/helpers/user/update-user-nfts'
import { getWalletsByUserId } from '@server/helpers/wallet/get-wallets-by-user-id'
import { removeWalletSchema } from '@server/validators/remove-wallet-schema'
import { assoc, map } from 'ramda'

export async function removeWalletRequestHandler(req: ApiRequest<RemoveWalletRequest>) {
  const requestBody = await req.json()
  const { wallet } = parseRemoveWalletRequest(requestBody)
  const user = await getUserFromRequest(req)
  await removeUserWallet(user.id, wallet)
  const wallets = await getWalletsByUserId(user.id)
  await updateUserNfts(assoc('wallets', map(mapWalletToWalletData, wallets), user), wallet.chainId)
  return emptyResponse()
}

function parseRemoveWalletRequest(request: RemoveWalletRequest) {
  try {
    return removeWalletSchema.parse(request)
  } catch (e) {
    throw new BadRequestError(`error parsing remove wallet request ${JSON.stringify(request)}`, e)
  }
}
