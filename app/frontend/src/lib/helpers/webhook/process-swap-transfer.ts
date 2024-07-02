import { getUserById } from '@echo/firestore/crud/user/get-user-by-id'
import { getUserFromFirestoreData } from '@echo/firestore/helpers/user/get-user-from-firestore-data'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import type { TransferData } from '@echo/frontend/lib/types/transfer/transfer-data'
import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import { addCollection } from '@echo/tasks/add-collection'
import { updateNft } from '@echo/tasks/update-nft'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { assoc, isNil, otherwise, pipe } from 'ramda'

/**
 * Processes the transfer of an NFT from a user in our database to another user in our database.
 * Modifies the NFT ownership
 */
export async function processSwapTransfer(
  args: WithLoggerType<Record<'transfer', Omit<TransferData, 'to'> & Record<'to', WalletDocumentData>>>
): Promise<void> {
  const logger = args.logger?.child({ fn: processSwapTransfer.name })
  const {
    transfer: { contract, to, tokenId }
  } = args
  const userDocumentData = await pipe(
    getUserById,
    otherwise((err) => {
      logger?.error({ err, user: { id: to.userId } }, 'could not get user from Firestore')
      return undefined
    })
  )(to.userId)
  if (!isNil(userDocumentData)) {
    const user = getUserFromFirestoreData({ user: userDocumentData, wallet: to })
    const collection = await pipe(
      addCollection,
      otherwise((err) => {
        logger?.error({ err, collection: { contract } }, 'could not add collection')
        return undefined
      })
    )({ contract, fetch, logger })
    if (!isNil(collection)) {
      const nftIndex = getNftIndex({ collection, tokenId })
      await pipe(
        updateNft,
        otherwise((err) => {
          logger?.error({ err, nft: assoc('owner', user, nftIndex), collection }, 'could not update NFT')
        })
      )({ nftIndex, owner: user, collection })
    }
  }
}
