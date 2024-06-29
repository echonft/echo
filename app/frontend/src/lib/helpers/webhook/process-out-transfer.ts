import { deleteNft } from '@echo/firestore/crud/nft/delete-nft'
import { getNftSnapshotForIndex } from '@echo/firestore/crud/nft/get-nft'
import type { TransferData } from '@echo/frontend/lib/types/transfer/transfer-data'
import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import { addCollection } from '@echo/tasks/add-collection'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { assoc, isNil } from 'ramda'

/**
 * Processes the transfer of an NFT from a user in our database to a foreign user.
 * Deletes the NFT and its collection if necessary.
 */
export async function processOutTransfer(args: WithLoggerType<Record<'transfer', TransferData>>) {
  const {
    transfer: { contract, tokenId },
    logger
  } = args
  const collection = await addCollection({ contract, fetch, logger })
  if (!isNil(collection)) {
    const nftIndex = getNftIndex({ collection, tokenId })
    const snapshot = await getNftSnapshotForIndex(nftIndex)
    if (isNil(snapshot)) {
      return
    }
    await deleteNft(snapshot.id)
    logger?.info({ fn: processOutTransfer.name, nft: assoc('id', snapshot.id, nftIndex) }, 'deleted NFT')
  }
}
