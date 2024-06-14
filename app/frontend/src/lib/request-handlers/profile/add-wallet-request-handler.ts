import { type ApiRequest } from '@echo/api/types/api-request'
import { type AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import type { WalletsResponse } from '@echo/api/types/responses/wallets-response'
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
import type { Wallet } from '@echo/model/types/wallet'
import type { User } from 'next-auth'
import { NextResponse } from 'next/server'
import { andThen, map, pipe, prop } from 'ramda'

export async function addWalletRequestHandler({ user, req }: AuthRequestHandlerArgs<AddWalletRequest>) {
  const requestBody = await guardAsyncFn(
    (req: ApiRequest<AddWalletRequest>) => req.json(),
    ErrorStatus.BAD_REQUEST
  )(req)
  const { message, wallet, signature } = guardFn(
    (requestBody) => addWalletSchema.parse(requestBody),
    ErrorStatus.BAD_REQUEST
  )(requestBody)
  const siweMessage = guardFn(getSiweMessage, ErrorStatus.BAD_REQUEST)(message)
  const verifiedMessage = await guardAsyncFn(verifySiweMessage, ErrorStatus.BAD_REQUEST)(signature, siweMessage)
  const foundUser = await guardAsyncFn(getUserByUsername, ErrorStatus.SERVER_ERROR)(user.username)
  assertUserExists(foundUser, user.username)
  const nonce = await guardAsyncFn(getNonceForUser, ErrorStatus.SERVER_ERROR)(foundUser.username)
  assertNonce(nonce, verifiedMessage)
  await guardAsyncFn(addWallet, ErrorStatus.SERVER_ERROR)(foundUser.username, wallet)
  const wallets = await guardAsyncFn(
    pipe<[User], string, Promise<WalletDocumentData[]>, Promise<Wallet[]>>(
      prop('username'),
      getWalletsForUser,
      andThen(map(mapWalletDocumentDataToWallet))
    ),
    ErrorStatus.SERVER_ERROR
  )(user)
  return NextResponse.json<WalletsResponse>({ wallets })
}
