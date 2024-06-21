import { type RemoveWalletRequest } from '@echo/api/types/requests/remove-wallet-request'
import type { WalletsResponse } from '@echo/api/types/responses/wallets-response'
import type { User } from '@echo/auth/types/user'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import { removeWallet } from '@echo/firestore/crud/wallet/remove-wallet'
import { mapWalletDocumentDataToWallet } from '@echo/firestore/mappers/wallet/map-wallet-document-data-to-wallet'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn } from '@echo/frontend/lib/helpers/error/guard'
import { assertUserExists } from '@echo/frontend/lib/helpers/user/assert/assert-user-exists'
import type { AuthRequestHandlerArgs } from '@echo/frontend/lib/types/request-handlers/auth-request-handler'
import { parseRequest } from '@echo/frontend/lib/validators/parse-request'
import { removeWalletSchema } from '@echo/frontend/lib/validators/remove-wallet-schema'
import type { Wallet } from '@echo/model/types/wallet'
import { NextResponse } from 'next/server'
import { andThen, map, pipe, prop } from 'ramda'

export async function removeWalletRequestHandler({ user, req, logger }: AuthRequestHandlerArgs<RemoveWalletRequest>) {
  const { wallet } = await guardAsyncFn({
    fn: parseRequest(removeWalletSchema),
    status: ErrorStatus.BAD_REQUEST,
    logger
  })(req)
  const foundUser = await guardAsyncFn({ fn: getUserByUsername, status: ErrorStatus.SERVER_ERROR, logger })(
    user.username
  )
  assertUserExists(foundUser, user.username)
  await guardAsyncFn({ fn: removeWallet, status: ErrorStatus.SERVER_ERROR, logger })(foundUser.username, wallet)
  const wallets = await guardAsyncFn({
    fn: pipe<[User], string, Promise<WalletDocumentData[]>, Promise<Wallet[]>>(
      prop('username'),
      getWalletsForUser,
      andThen(map(mapWalletDocumentDataToWallet))
    ),
    status: ErrorStatus.SERVER_ERROR,
    logger
  })(user)
  return NextResponse.json<WalletsResponse>({ wallets })
}
