import { getUserById } from '@echo/firestore/crud/user/get-user-by-id'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { setMaxInstances } from '@echo/firestore-functions/helper/set-max-instances'
import { FirestoreFunctionsLogger } from '@echo/firestore-functions/services/firestore-functions-logger'
import { removeNftsForWallet } from '@echo/firestore-functions/tasks/nft/remove-nfts-for-wallet'
import { updateUserNfts } from '@echo/firestore-functions/tasks/nft/update-user-nfts'
import { getSupportedChains } from '@echo/utils/helpers/chains/get-supported-chains'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { DocumentSnapshot } from 'firebase-admin/firestore'
import { onDocumentWritten } from 'firebase-functions/v2/firestore'
import { assoc, isNil, map, pipe } from 'ramda'

export const onWalletWritten = onDocumentWritten(
  setMaxInstances({ document: 'wallets/{id}', timeoutSeconds: 540 }),
  async (event) => {
    const logger = new FirestoreFunctionsLogger()
    const change = event.data
    if (!isNil(change)) {
      if (change.after?.exists) {
        // wallet was created
        const wallet = getDocumentSnapshotData<WalletDocumentData>(change.after as DocumentSnapshot<WalletDocumentData>)
        if (!isNil(wallet)) {
          logger.info(`wallet ${JSON.stringify(wallet)} was added`)
          try {
            const foundUser = await getUserById(wallet.userId)
            if (!isNil(foundUser)) {
              try {
                if (wallet.isEvm) {
                  const wallets = pipe(
                    getSupportedChains,
                    map((chain) => assoc('chain', chain, wallet))
                  )()
                  await updateUserNfts(foundUser, wallets, logger)
                } else {
                  await updateUserNfts(foundUser, [wallet], logger)
                }
              } catch (e) {
                logger.error(`error upating user ${wallet.userId} NFTs: ${errorMessage(e)}`)
              }
            }
          } catch (e) {
            logger.error(`error getting user ${wallet.userId}: ${errorMessage(e)}`)
          }
        }
      } else if (change.before?.exists) {
        // wallet was deleted
        const wallet = getDocumentSnapshotData<WalletDocumentData>(
          change.before as DocumentSnapshot<WalletDocumentData>
        )
        if (!isNil(wallet)) {
          logger.info(`wallet ${JSON.stringify(wallet)} was deleted`)
          try {
            await removeNftsForWallet(wallet)
          } catch (e) {
            logger.error(`error removing NFTs for wallet ${wallet.address}: ${errorMessage(e)}`)
          }
        }
      }
    }
  }
)
