import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import { mapWalletDocumentDataToWallet } from '@echo/firestore/mappers/wallet/map-wallet-document-data-to-wallet'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet-document-data'
import { toNextReponse } from '@echo/frontend/lib/request-handlers/to-next-reponse'
import type { AuthRequestHandlerArgs } from '@echo/frontend/lib/types/request-handlers/auth-request-handler'
import type { Wallet } from '@echo/model/types/wallet'
import type { NextResponse } from 'next/server'
import { andThen, map, objOf, pipe } from 'ramda'

export function getWalletsRequestHandler({ user: { username } }: AuthRequestHandlerArgs) {
  return pipe<[string], Promise<WalletDocumentData[]>, Promise<NextResponse<Record<'wallets', Wallet[]>>>>(
    getWalletsForUser,
    andThen(pipe(map(mapWalletDocumentDataToWallet), objOf('wallets'), toNextReponse))
  )(username)
}
