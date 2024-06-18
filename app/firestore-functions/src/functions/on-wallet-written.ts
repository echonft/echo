import { setMaxInstances } from '@echo/firestore-functions/helper/set-max-instances'
import { getUserById } from '@echo/firestore/crud/user/get-user-by-id'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { removeNftsForWallet } from '@echo/tasks/remove-nfts-for-wallet'
import { updateNftsForWallet } from '@echo/tasks/update-nfts-for-wallet'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { DocumentSnapshot } from 'firebase-admin/firestore'
import { error, info } from 'firebase-functions/logger'
import { onDocumentWritten } from 'firebase-functions/v2/firestore'
import { isNil } from 'ramda'

export const onWalletWritten = onDocumentWritten(
  setMaxInstances({ document: 'wallets/{id}', timeoutSeconds: 540 }),
  async (event) => {
    const change = event.data
    if (!isNil(change)) {
      if (change.after.exists) {
        // wallet was created
        const wallet = getDocumentSnapshotData<WalletDocumentData>(change.after as DocumentSnapshot<WalletDocumentData>)
        if (!isNil(wallet)) {
          info(`wallet ${JSON.stringify(wallet)} was added`)
          try {
            const foundUser = await getUserById(wallet.userId)
            if (!isNil(foundUser)) {
              try {
                await updateNftsForWallet({ wallet })
              } catch (e) {
                error(`error upating user ${wallet.userId} NFTs: ${errorMessage(e)}`)
              }
            }
          } catch (e) {
            error(`error getting user ${wallet.userId}: ${errorMessage(e)}`)
          }
        }
      } else if (change.before.exists) {
        // wallet was deleted
        const wallet = getDocumentSnapshotData<WalletDocumentData>(
          change.before as DocumentSnapshot<WalletDocumentData>
        )
        if (!isNil(wallet)) {
          info(`wallet ${JSON.stringify(wallet)} was deleted`)
          try {
            await removeNftsForWallet({ wallet })
          } catch (e) {
            error(`error removing NFTs for wallet ${wallet.address}: ${errorMessage(e)}`)
          }
        }
      }
    }
  }
)
