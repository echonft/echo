import { type RemoveWalletRequest } from '@echo/api/types/requests/remove-wallet-request'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import { removeWallet } from '@echo/firestore/crud/wallet/remove-wallet'
import { mapWalletDocumentDataToWallet } from '@echo/firestore/mappers/wallet/map-wallet-document-data-to-wallet'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { NotFoundError } from '@echo/frontend/lib/helpers/error/not-found-error'
import { toNextReponse } from '@echo/frontend/lib/request-handlers/to-next-reponse'
import type { AuthRequestHandlerArgs } from '@echo/frontend/lib/types/request-handlers/auth-request-handler'
import { parseRequest } from '@echo/frontend/lib/validators/parse-request'
import { removeWalletSchema } from '@echo/frontend/lib/validators/remove-wallet-schema'
import type { Wallet } from '@echo/model/types/wallet'
import type { NextResponse } from 'next/server'
import { andThen, isNil, map, objOf, pipe } from 'ramda'

export async function removeWalletRequestHandler({
  user: { username },
  req
}: AuthRequestHandlerArgs<RemoveWalletRequest>) {
  const { wallet } = await parseRequest(removeWalletSchema)(req)
  const foundUser = await getUserByUsername(username)
  if (isNil(foundUser)) {
    return Promise.reject(new NotFoundError())
  }
  await removeWallet(foundUser.username, wallet)
  return pipe<[string], Promise<WalletDocumentData[]>, Promise<NextResponse<Record<'wallets', Wallet[]>>>>(
    getWalletsForUser,
    andThen(pipe(map(mapWalletDocumentDataToWallet), objOf('wallets'), toNextReponse))
  )(username)
}
