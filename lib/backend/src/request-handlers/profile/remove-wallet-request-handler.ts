import type { RemoveWalletRequest } from '@echo/api/types/requests/remove-wallet-request'
import { removeWalletRequestSchema } from '@echo/api/validators/remove-wallet-request-schema'
import { NotFoundError } from '@echo/backend/errors/not-found-error'
import { toNextReponse } from '@echo/backend/request-handlers/to-next-reponse'
import type { AuthRequestHandlerArgs } from '@echo/backend/types/auth-request-handler'
import { parseRequest } from '@echo/backend/validators/parse-request'
import { walletDocumentToModel } from '@echo/firestore/converters/wallet-document-to-model'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import { removeWallet } from '@echo/firestore/crud/wallet/remove-wallet'
import { walletFromContract } from '@echo/model/helpers/wallet/wallet-from-contract'
import { andThen, isNil, map, objOf, pipe } from 'ramda'

export async function removeWalletRequestHandler({
  user: { username },
  req
}: AuthRequestHandlerArgs<RemoveWalletRequest>) {
  const { address, chain } = await parseRequest(removeWalletRequestSchema)(req)
  const foundUser = await getUserByUsername(username)
  if (isNil(foundUser)) {
    return Promise.reject(new NotFoundError())
  }
  await pipe(walletFromContract, removeWallet)({ address, chain })
  return pipe(getWalletsForUser, andThen(pipe(map(walletDocumentToModel), objOf('wallets'), toNextReponse)))(username)
}
