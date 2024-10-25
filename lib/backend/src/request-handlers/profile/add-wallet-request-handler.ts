import type { AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import { addWalletRequestSchema } from '@echo/api/validators/add-wallet-request-schema'
import { ForbiddenError } from '@echo/backend/errors/forbidden-error'
import { NotFoundError } from '@echo/backend/errors/not-found-error'
import { toNextReponse } from '@echo/backend/request-handlers/to-next-reponse'
import type { AuthRequestHandlerArgs } from '@echo/backend/types/auth-request-handler'
import { parseRequest } from '@echo/backend/validators/parse-request'
import { getNonceForUser } from '@echo/firestore/crud/nonce/get-nonce-for-user'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { addWallet } from '@echo/firestore/crud/wallet/add-wallet'
import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import type { Wallet } from '@echo/model/types/wallet'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { NextResponse } from 'next/server'
import { andThen, isNil, objOf, pipe } from 'ramda'

export async function addWalletRequestHandler({ user: { username }, req }: AuthRequestHandlerArgs<AddWalletRequest>) {
  const { wallet, nonce: requestNonce } = await parseRequest(addWalletRequestSchema)(req)
  const foundUser = await getUserByUsername(username)
  if (isNil(foundUser)) {
    return Promise.reject(new NotFoundError())
  }
  const nonce = await getNonceForUser(foundUser.username)
  if (isNilOrEmpty(nonce) || nonce.expired || isNilOrEmpty(requestNonce) || requestNonce !== nonce.nonce) {
    return Promise.reject(new ForbiddenError())
  }
  await addWallet(foundUser.username, wallet)
  return pipe<[string], Promise<Wallet[]>, Promise<NextResponse<Record<'wallets', Wallet[]>>>>(
    getWalletsForUser,
    andThen(pipe(objOf('wallets'), toNextReponse))
  )(username)
}
