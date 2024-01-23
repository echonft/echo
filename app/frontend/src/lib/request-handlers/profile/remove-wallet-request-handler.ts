import { type ApiRequest } from '@echo/api/types/api-request'
import { type RemoveWalletRequest } from '@echo/api/types/requests/remove-wallet-request'
import type { WalletsResponse } from '@echo/api/types/responses/wallets-response'
import { findUserByUsername } from '@echo/firestore/crud/user/find-user-by-username'
import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import { removeWallet } from '@echo/firestore/crud/wallet/remove-wallet'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn, guardFn } from '@echo/frontend/lib/helpers/error/guard'
import { guarded_assertUserExists } from '@echo/frontend/lib/helpers/user/assert/guarded_assert-user-exists'
import { mapFirestoreWalletToWallet } from '@echo/frontend/lib/mappers/map-firestore-wallet-to-wallet'
import { removeWalletSchema } from '@echo/frontend/lib/validators/remove-wallet-schema'
import type { AuthUser } from '@echo/model/types/auth-user'
import type { Wallet } from '@echo/model/types/wallet'
import { NextResponse } from 'next/server'
import { andThen, map, pipe, prop } from 'ramda'

export async function removeWalletRequestHandler(user: AuthUser, req: ApiRequest<RemoveWalletRequest>) {
  const requestBody = await guardAsyncFn(
    (req: ApiRequest<RemoveWalletRequest>) => req.json(),
    ErrorStatus.BAD_REQUEST
  )(req)
  const { wallet } = guardFn(
    (requestBody) => removeWalletSchema.parse(requestBody),
    ErrorStatus.BAD_REQUEST
  )(requestBody)
  const foundUser = await guardAsyncFn(findUserByUsername, ErrorStatus.SERVER_ERROR)(user.username)
  guarded_assertUserExists(foundUser, user.username)
  await guardAsyncFn(removeWallet, ErrorStatus.SERVER_ERROR)(foundUser.id, wallet)
  const wallets = await guardAsyncFn(
    pipe<[AuthUser], string, Promise<WalletDocumentData[]>, Promise<Wallet[]>>(
      prop('username'),
      getWalletsForUser,
      andThen(map(mapFirestoreWalletToWallet))
    ),
    ErrorStatus.SERVER_ERROR
  )(user)
  return NextResponse.json<WalletsResponse>({ wallets })
}
