import { type AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import { getNonceForUser } from '@echo/firestore/crud/nonce/get-nonce-for-user'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { addWallet } from '@echo/firestore/crud/wallet/add-wallet'
import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import { mapWalletDocumentDataToWallet } from '@echo/firestore/mappers/wallet/map-wallet-document-data-to-wallet'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { ForbiddenError } from '@echo/frontend/lib/helpers/error/forbidden-error'
import { NotFoundError } from '@echo/frontend/lib/helpers/error/not-found-error'
import { toNextReponse } from '@echo/frontend/lib/request-handlers/to-next-reponse'
import type { AuthRequestHandlerArgs } from '@echo/frontend/lib/types/request-handlers/auth-request-handler'
import { addWalletSchema } from '@echo/frontend/lib/validators/add-wallet-schema'
import { parseRequest } from '@echo/frontend/lib/validators/parse-request'
import type { Wallet } from '@echo/model/types/wallet'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { NextResponse } from 'next/server'
import { andThen, isNil, map, objOf, pipe } from 'ramda'

export async function addWalletRequestHandler({ user: { username }, req }: AuthRequestHandlerArgs<AddWalletRequest>) {
  const { wallet, nonce: requestNonce } = await parseRequest(addWalletSchema)(req)
  const foundUser = await getUserByUsername(username)
  if (isNil(foundUser)) {
    return Promise.reject(new NotFoundError())
  }
  const nonce = await getNonceForUser(foundUser.username)
  if (isNilOrEmpty(nonce) || nonce.expired || isNilOrEmpty(requestNonce) || requestNonce !== nonce.nonce) {
    return Promise.reject(new ForbiddenError())
  }
  await addWallet(foundUser.username, wallet)
  return pipe<[string], Promise<WalletDocumentData[]>, Promise<NextResponse<Record<'wallets', Wallet[]>>>>(
    getWalletsForUser,
    andThen(pipe(map(mapWalletDocumentDataToWallet), objOf('wallets'), toNextReponse))
  )(username)
}
