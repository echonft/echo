import { type ApiRequest } from '@echo/api/types/api-request'
import { type RemoveWalletRequest } from '@echo/api/types/requests/remove-wallet-request'
import type { WalletsResponse } from '@echo/api/types/responses/wallets-response'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import { removeWallet } from '@echo/firestore/crud/wallet/remove-wallet'
import { mapWalletDocumentDataToWallet } from '@echo/firestore/mappers/wallet/map-wallet-document-data-to-wallet'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn, guardFn } from '@echo/frontend/lib/helpers/error/guard'
import { assertUserExists } from '@echo/frontend/lib/helpers/user/assert/assert-user-exists'
import { removeWalletSchema } from '@echo/frontend/lib/validators/remove-wallet-schema'
import type { Wallet } from '@echo/model/types/wallet'
import { NextResponse } from 'next/server'
import type { User } from 'next-auth'
import { andThen, map, pipe, prop } from 'ramda'

export async function removeWalletRequestHandler(user: User, req: ApiRequest<RemoveWalletRequest>) {
  const requestBody = await guardAsyncFn(
    (req: ApiRequest<RemoveWalletRequest>) => req.json(),
    ErrorStatus.BAD_REQUEST
  )(req)
  const { wallet } = guardFn(
    (requestBody) => removeWalletSchema.parse(requestBody),
    ErrorStatus.BAD_REQUEST
  )(requestBody)
  const foundUser = await guardAsyncFn(getUserByUsername, ErrorStatus.SERVER_ERROR)(user.username)
  assertUserExists(foundUser, user.username)
  await guardAsyncFn(removeWallet, ErrorStatus.SERVER_ERROR)(foundUser.username, wallet)
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
