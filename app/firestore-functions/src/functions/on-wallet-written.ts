import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { setMaxInstances } from '@echo/firestore-functions/helper/set-max-instances'
import { updateUserNfts } from '@echo/firestore-functions/helper/update-user-nfts'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { DocumentSnapshot } from 'firebase-admin/firestore'
import { error, log } from 'firebase-functions/logger'
import { onDocumentWritten } from 'firebase-functions/v2/firestore'
import { isNil } from 'ramda'

export const onWalletWritten = onDocumentWritten(setMaxInstances({ document: 'wallets/{id}' }), async (event) => {
  const change = event.data
  if (!isNil(change)) {
    if (change.after?.exists) {
      // wallet was created
      const wallet = getDocumentSnapshotData<WalletDocumentData>(change.after as DocumentSnapshot<WalletDocumentData>)
      if (!isNil(wallet)) {
        log(`wallet ${JSON.stringify(wallet)} was added`)
        try {
          await updateUserNfts(wallet.userId)
        } catch (e) {
          error(`error upating user ${wallet.userId} NFTs: ${errorMessage(e)}`)
        }
      }
    } else if (change.before?.exists) {
      // wallet was deleted
      const wallet = getDocumentSnapshotData<WalletDocumentData>(change.before as DocumentSnapshot<WalletDocumentData>)
      if (!isNil(wallet)) {
        log(`wallet ${JSON.stringify(wallet)} was deleted`)
        try {
          await updateUserNfts(wallet.userId)
        } catch (e) {
          error(`error upating user ${wallet.userId} NFTs: ${errorMessage(e)}`)
        }
      }
    }
  }
})
