import type { AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import { toNextReponse } from '@echo/backend/request-handlers/to-next-reponse'
import type { AuthRequestHandlerArgs } from '@echo/backend/types/auth-request-handler'
import { addWalletRequestTransformSchema } from '@echo/backend/validators/add-wallet-request-transform-schema'
import { parseRequest } from '@echo/backend/validators/parse-request'
import { walletDocumentToModel } from '@echo/firestore/converters/wallet-document-to-model'
import { addWallet } from '@echo/firestore/crud/wallet/add-wallet'
import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import { always, andThen, map, objOf, partial, pipe } from 'ramda'

export function addWalletRequestHandler({ user: { username }, req }: AuthRequestHandlerArgs<AddWalletRequest>) {
  return pipe(
    parseRequest(addWalletRequestTransformSchema(username)),
    andThen(
      pipe(
        partial(addWallet, [username]),
        andThen(
          pipe(
            always(username),
            getWalletsForUser,
            andThen(pipe(map(walletDocumentToModel), objOf('wallets'), toNextReponse))
          )
        )
      )
    )
  )(req)
}
