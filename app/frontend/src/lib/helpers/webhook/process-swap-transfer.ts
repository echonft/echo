import { getUserById } from '@echo/firestore/crud/user/get-user-by-id'
import { getUserFromFirestoreData } from '@echo/firestore/helpers/user/get-user-from-firestore-data'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { captureAndLogError } from '@echo/frontend/lib/helpers/capture-and-log-error'
import { NotFoundError } from '@echo/frontend/lib/helpers/error/not-found-error'
import type { TransferData } from '@echo/frontend/lib/types/transfer/transfer-data'
import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import { addCollection } from '@echo/tasks/add-collection'
import { updateNft } from '@echo/tasks/update-nft'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { isNil, otherwise, pipe } from 'ramda'

/**
 * Processes the transfer of an NFT from a user in our database to another user in our database.
 * Modifies the NFT ownership
 */
export async function processSwapTransfer(
  args: WithLoggerType<Record<'transfer', Omit<TransferData, 'to'> & Record<'to', WalletDocumentData>>>
): Promise<void> {
  const {
    transfer: { contract, to, tokenId },
    logger
  } = args
  const userDocumentData = await pipe(
    getUserById,
    otherwise((err) => {
      captureAndLogError(err, {
        logObject: { user: { id: to.userId } },
        message: 'could not get user from Firestore'
      })
      return undefined
    })
  )(to.userId)
  if (isNil(userDocumentData)) {
    return Promise.reject(new NotFoundError({ message: 'user not found', severity: 'warning' }))
  }
  const user = getUserFromFirestoreData({ user: userDocumentData, wallet: to })
  const collection = await addCollection({ contract, fetch, logger })
  const nftIndex = getNftIndex({ collection, tokenId })
  await updateNft({ nft: nftIndex, owner: user, collection })
}
