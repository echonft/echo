import { getLogger } from '@echo/firestore-functions/helper/get-logger'
import { setMaxInstances } from '@echo/firestore-functions/helper/set-max-instances'
import { getUserById } from '@echo/firestore/crud/user/get-user-by-id'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { removeNftsForWallet } from '@echo/tasks/remove-nfts-for-wallet'
import { updateNftsForWallet } from '@echo/tasks/update-nfts-for-wallet'
import { DocumentSnapshot } from 'firebase-admin/firestore'
import { onDocumentWritten } from 'firebase-functions/v2/firestore'
import { isNil } from 'ramda'

export const onWalletWritten = onDocumentWritten(
  setMaxInstances({ document: 'wallets/{id}', timeoutSeconds: 540 }),
  async (event) => {
    const logger = getLogger().child({ function: 'onWalletWritten' })
    const change = event.data
    if (!isNil(change)) {
      if (change.after.exists) {
        // wallet was created
        const wallet = getDocumentSnapshotData<WalletDocumentData>(change.after as DocumentSnapshot<WalletDocumentData>)
        if (!isNil(wallet)) {
          logger.info({ wallet }, 'wallet was added')
          try {
            const foundUser = await getUserById(wallet.userId)
            if (!isNil(foundUser)) {
              try {
                await updateNftsForWallet({ wallet, fetch, logger })
              } catch (err) {
                logger.error({ err, wallet }, 'error updating NFTs for wallet')
              }
            }
          } catch (err) {
            logger.error({ err, user: { id: wallet.userId } }, 'error getting user')
          }
        }
      } else if (change.before.exists) {
        // wallet was deleted
        const wallet = getDocumentSnapshotData<WalletDocumentData>(
          change.before as DocumentSnapshot<WalletDocumentData>
        )
        if (!isNil(wallet)) {
          logger.info({ wallet }, 'wallet was deleted')
          try {
            await removeNftsForWallet({ wallet, logger })
          } catch (err) {
            logger.error({ err, wallet }, 'error removing NFTs for wallet')
          }
        }
      }
    }
  }
)
