import { getCollection } from '@echo/contract-listener/helpers/get-collection'
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
  const { contractAddress, chain, tokenId, logger } = args
  const fn = 'processOutTransfer'
  logger?.info(
    { fn, nft: { collection: { contract: { address: contractAddress, chain: args.chain } } } },
    'processing outbound transfer'
  )
  const collection = await getCollection({ chain, address: contractAddress })
  const nftIndex = getNftIndex({ collection, tokenId })
  const snapshot = await getNftSnapshot(nftIndex)
  if (isNil(snapshot)) {
    logger?.error({ fn, nft: nftIndex }, 'NFT not found')
    return
  }
  await deleteNft(snapshot.id)
  logger?.info({ fn, nft: nftIndex }, 'NFT deleted')
}
