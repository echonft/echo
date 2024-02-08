import { type ApiRequest } from '@echo/api/types/api-request'
import { type AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import type { WalletsResponse } from '@echo/api/types/responses/wallets-response'
import { findNonceForUser } from '@echo/firestore/crud/nonce/find-nonce-for-user'
import { findUserByUsername } from '@echo/firestore/crud/user/find-user-by-username'
import { addWallet } from '@echo/firestore/crud/wallet/add-wallet'
import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import { mapWalletDocumentDataToWallet } from '@echo/firestore/mappers/map-wallet-document-data-to-wallet'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { getSiweMessage } from '@echo/frontend/lib/helpers/auth/get-siwe-message'
import { verifySiweMessage } from '@echo/frontend/lib/helpers/auth/verify-siwe-message'
import { guardAsyncFn, guardFn } from '@echo/frontend/lib/helpers/error/guard'
import { guarded_assertNonce } from '@echo/frontend/lib/helpers/user/assert/guarded_assert-nonce'
import { guarded_assertUserExists } from '@echo/frontend/lib/helpers/user/assert/guarded_assert-user-exists'
import { updateUserNfts } from '@echo/frontend/lib/helpers/user/update-user-nfts'
import { addWalletSchema } from '@echo/frontend/lib/validators/add-wallet-schema'
import type { AuthUser } from '@echo/model/types/auth-user'
import type { Wallet } from '@echo/model/types/wallet'
import { NextResponse } from 'next/server'
import { andThen, map, pipe, prop } from 'ramda'

export async function addWalletRequestHandler(user: AuthUser, req: ApiRequest<AddWalletRequest>) {
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
  const foundUser = await guardAsyncFn(findUserByUsername, ErrorStatus.SERVER_ERROR)(user.username)
  guarded_assertUserExists(foundUser, user.username)
  const nonce = await guardAsyncFn(findNonceForUser, ErrorStatus.SERVER_ERROR)(foundUser.id)
  guarded_assertNonce(nonce, verifiedMessage)
  await guardAsyncFn(addWallet, ErrorStatus.SERVER_ERROR)(foundUser.id, wallet)
  const wallets = await guardAsyncFn(
    pipe<[AuthUser], string, Promise<WalletDocumentData[]>, Promise<Wallet[]>>(
      prop('username'),
      getWalletsForUser,
      andThen(map(mapWalletDocumentDataToWallet))
    ),
    ErrorStatus.SERVER_ERROR
  )(user)
  await guardAsyncFn(updateUserNfts, ErrorStatus.SERVER_ERROR)(foundUser.discord.id)
  return NextResponse.json<WalletsResponse>({ wallets })
}
