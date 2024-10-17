import { toNextReponse } from '@echo/backend/request-handlers/to-next-reponse'
import type { AuthRequestHandlerArgs } from '@echo/backend/types/auth-request-handler'
import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import type { Wallet } from '@echo/model/types/wallet'
import type { NextResponse } from 'next/server'
import { andThen, objOf, pipe } from 'ramda'

export function getWalletsRequestHandler({ user: { username } }: AuthRequestHandlerArgs) {
  return pipe<[string], Promise<Wallet[]>, Promise<NextResponse<Record<'wallets', Wallet[]>>>>(
    getWalletsForUser,
    andThen(pipe(objOf('wallets'), toNextReponse))
  )(username)
}
