import { getUserById } from '@echo/firestore/crud/user/get-user-by-id'
import { getUserFromFirestoreData } from '@echo/firestore/helpers/user/get-user-from-firestore-data'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { captureAndLogError } from '@echo/frontend/lib/helpers/capture-and-log-error'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import { andThen, assoc, objOf, otherwise, pipe, prop } from 'ramda'

export function getUserFromWalletDocumentData(wallet: WalletDocumentData) {
  return pipe(
    prop('userId'),
    getUserById,
    otherwise((err) => {
      captureAndLogError(err, {
        logObject: { user: { id: wallet.userId } },
        message: 'could not get user from Firestore'
      })
      return undefined
    }),
    andThen(unlessNil(pipe(objOf('user'), assoc('wallet', wallet), getUserFromFirestoreData)))
  )(wallet)
}
