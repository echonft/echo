import type { RemoveWalletRequest } from '@echo/api/types/requests/remove-wallet-request'
import { removeWalletRequestSchema } from '@echo/api/validators/remove-wallet-request-schema'
import { NotFoundError } from '@echo/backend/errors/not-found-error'
import { toNextReponse } from '@echo/backend/request-handlers/to-next-reponse'
import type { AuthRequestHandlerArgs } from '@echo/backend/types/auth-request-handler'
import { parseRequest } from '@echo/backend/validators/parse-request'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import { removeWallet } from '@echo/firestore/crud/wallet/remove-wallet'
import type { Wallet } from '@echo/model/types/wallet'
import type { NextResponse } from 'next/server'
import { andThen, isNil, objOf, pipe } from 'ramda'

export async function removeWalletRequestHandler({
  user: { username },
  req
}: AuthRequestHandlerArgs<RemoveWalletRequest>) {
  const { wallet } = await parseRequest(removeWalletRequestSchema)(req)
  const foundUser = await getUserByUsername(username)
  if (isNil(foundUser)) {
    return Promise.reject(new NotFoundError())
  }
  await removeWallet(foundUser.username, wallet)
  return pipe<[string], Promise<Wallet[]>, Promise<NextResponse<Record<'wallets', Wallet[]>>>>(
    getWalletsForUser,
    andThen(pipe(objOf('wallets'), toNextReponse))
  )(username)
}
