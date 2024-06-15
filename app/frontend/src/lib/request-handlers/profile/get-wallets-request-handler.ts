import type { WalletsResponse } from '@echo/api/types/responses/wallets-response'
import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import { mapWalletDocumentDataToWallet } from '@echo/firestore/mappers/wallet/map-wallet-document-data-to-wallet'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn } from '@echo/frontend/lib/helpers/error/guard'
import type { AuthRequestHandlerArgs } from '@echo/frontend/lib/types/request-handlers/auth-request-handler'
import type { Wallet } from '@echo/model/types/wallet'
import type { User } from 'next-auth'
import { NextResponse } from 'next/server'
import { andThen, map, pipe, prop } from 'ramda'

export async function getWalletsRequestHandler({ user, logger }: AuthRequestHandlerArgs) {
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
