import { toNextReponse } from '@echo/backend/request-handlers/to-next-reponse'
import type { AuthRequestHandlerArgs } from '@echo/backend/types/auth-request-handler'
import { walletDocumentToModel } from '@echo/firestore/converters/wallet-document-to-model'
import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import { andThen, map, objOf, pipe } from 'ramda'

export function getWalletsRequestHandler({ user: { username } }: AuthRequestHandlerArgs) {
  return pipe(getWalletsForUser, andThen(pipe(map(walletDocumentToModel), objOf('wallets'), toNextReponse)))(username)
}
