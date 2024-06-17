import { deleteNft } from '@echo/firestore/crud/nft/delete-nft'
import { getNftSnapshot } from '@echo/firestore/crud/nft/get-nft'
import { getCollection } from '@echo/frontend/lib/helpers/webhook/get-collection'
import type { TransferData } from '@echo/frontend/lib/types/transfer/transfer-data'
import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
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
  const collection = await getCollection({ contract, logger })
  const nftIndex = getNftIndex({ collection, tokenId })
  const snapshot = await getNftSnapshot(nftIndex)
  if (isNil(snapshot)) {
    return
  }
  await deleteNft(snapshot.id)
  logger?.info({ fn: processOutTransfer.name, nft: assoc('id', snapshot.id, nftIndex) }, 'deleted NFT')
}
