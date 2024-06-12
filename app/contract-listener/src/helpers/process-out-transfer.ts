import { getCollection } from '@echo/contract-listener/helpers/get-collection'
import { loggers } from '@echo/contract-listener/index'
import type { TransferData } from '@echo/contract-listener/types/transfer-data'
import { deleteNft } from '@echo/firestore/crud/nft/delete-nft'
import { getNftSnapshot } from '@echo/firestore/crud/nft/get-nft'
import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import { isNil } from 'ramda'

/**
 * Processes the transfer of an NFT from a user in our database to a foreign user.
 * Deletes the NFT and its collection if necessary.
 *
 * @param {TransferData} args
 */
export async function processOutTransfer(args: TransferData) {
  const { contractAddress, chain, tokenId } = args
  const logger = loggers.get(chain)
  const fn = 'processOutTransfer'
  logger?.info({ fn, nft_data: { contract: contractAddress, tokenId } }, 'processing outbound transfer')
  const collection = await getCollection({ chain, address: contractAddress })
  const nftIndex = getNftIndex({ collection, tokenId })
  const snapshot = await getNftSnapshot(nftIndex)
  if (isNil(snapshot)) {
    logger?.error({ fn, nft_data: nftIndex }, 'NFT not found')
    return
  }
  await deleteNft(snapshot.id)
  logger?.info({ fn, nft_data: nftIndex }, 'NFT deleted')
}
