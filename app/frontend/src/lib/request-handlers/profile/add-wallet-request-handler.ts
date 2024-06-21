import { type AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import type { WalletsResponse } from '@echo/api/types/responses/wallets-response'
import type { User } from '@echo/auth/types/user'
import { getNonceForUser } from '@echo/firestore/crud/nonce/get-nonce-for-user'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { addWallet } from '@echo/firestore/crud/wallet/add-wallet'
import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import { mapWalletDocumentDataToWallet } from '@echo/firestore/mappers/wallet/map-wallet-document-data-to-wallet'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { getSiweMessage } from '@echo/frontend/lib/helpers/auth/get-siwe-message'
import { verifySiweMessage } from '@echo/frontend/lib/helpers/auth/verify-siwe-message'
import { guardAsyncFn, guardFn } from '@echo/frontend/lib/helpers/error/guard'
import { assertNonce } from '@echo/frontend/lib/helpers/user/assert/assert-nonce'
import { assertUserExists } from '@echo/frontend/lib/helpers/user/assert/assert-user-exists'
import type { AuthRequestHandlerArgs } from '@echo/frontend/lib/types/request-handlers/auth-request-handler'
import { addWalletSchema } from '@echo/frontend/lib/validators/add-wallet-schema'
import { parseRequest } from '@echo/frontend/lib/validators/parse-request'
import type { Wallet } from '@echo/model/types/wallet'
import { NextResponse } from 'next/server'
import { andThen, map, pipe, prop } from 'ramda'

export async function addWalletRequestHandler({ user, req, logger }: AuthRequestHandlerArgs<AddWalletRequest>) {
  const { message, wallet, signature } = await guardAsyncFn({
    fn: parseRequest(addWalletSchema),
    status: ErrorStatus.BAD_REQUEST,
    logger
  })(req)
  const siweMessage = guardFn({ fn: getSiweMessage, status: ErrorStatus.BAD_REQUEST, logger })(message)
  const verifiedMessage = await guardAsyncFn({ fn: verifySiweMessage, status: ErrorStatus.BAD_REQUEST, logger })(
    signature,
    siweMessage
  )
  const foundUser = await guardAsyncFn({ fn: getUserByUsername, status: ErrorStatus.SERVER_ERROR, logger })(
    user.username
  )
  assertUserExists(foundUser, user.username)
  const nonce = await guardAsyncFn({ fn: getNonceForUser, status: ErrorStatus.SERVER_ERROR, logger })(
    foundUser.username
  )
  assertNonce(nonce, verifiedMessage)
  await guardAsyncFn({ fn: addWallet, status: ErrorStatus.SERVER_ERROR, logger })(foundUser.username, wallet)
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
