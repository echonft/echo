import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { setMaxInstances } from '@echo/firestore-functions/helper/set-max-instances'
import { updateUserNfts } from '@echo/firestore-functions/helper/update-user-nfts'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { onDocumentWritten } from 'firebase-functions/v2/firestore'
import { always, ifElse, isNil, pipe, prop } from 'ramda'

export const onWalletWritten = onDocumentWritten(setMaxInstances({ document: 'wallets/{id}' }), async (event) => {
  await pipe(
    prop('data'),
    ifElse(
      isNil,
      always(Promise.resolve()),
      pipe(
        ifElse(
          propIsNil('before'),
          pipe(prop('after'), getDocumentSnapshotData<WalletDocumentData>),
          pipe(prop('before'), getDocumentSnapshotData<WalletDocumentData>)
        ),
        ifElse(isNil, always(Promise.resolve()), pipe(prop('userId'), updateUserNfts))
      )
    )
  )(event)
})
