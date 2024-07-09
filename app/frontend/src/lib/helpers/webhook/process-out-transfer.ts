import { deleteNft } from '@echo/firestore/crud/nft/delete-nft'
import { getNftSnapshotForIndex } from '@echo/firestore/crud/nft/get-nft'
import type { TransferData } from '@echo/frontend/lib/types/transfer/transfer-data'
import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import { addCollection } from '@echo/tasks/add-collection'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { andThen, otherwise, pipe, prop } from 'ramda'

/**
 * Processes the transfer of an NFT from a user in our database to a foreign user.
 * Deletes the NFT and its collection if necessary.
 */
export async function processOutTransfer(args: WithLoggerType<Record<'transfer', TransferData>>): Promise<void> {
  const {
    transfer: { contract, tokenId },
    logger
  } = args
  const collection = await addCollection({ contract, fetch, logger })
  const nftIndex = getNftIndex({ collection, tokenId })
  await pipe(
    getNftSnapshotForIndex,
    otherwise((err) => {
      logger?.error({ err, nft: nftIndex }, 'could get NFT snapshot')
      return undefined
    }),
    andThen(unlessNil(pipe(prop('id'), deleteNft)))
  )(nftIndex)
}
