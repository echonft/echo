import { getCollection } from '@echo/contract-listener/helpers/get-collection'
import type { TransferData } from '@echo/contract-listener/types/transfer-data'
import { deleteNft } from '@echo/firestore/crud/nft/delete-nft'
import { getNftSnapshot } from '@echo/firestore/crud/nft/get-nft'
import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import { isNil } from 'ramda'

/**
 * Processes the transfer of an NFT from a user in our database to a foreign user.
 * Deletes the NFT and its collection if necessary.
 *
 * @param {TransferData} args
 */
export async function processOutTransfer(args: TransferData) {
  const { contractAddress, chain, tokenId } = args
  pinoLogger.info(`OUT transfer for ${contractAddress}:${tokenId}, processing...`)
  try {
    const collection = await getCollection({ chain, address: contractAddress })
    const nftIndex = getNftIndex({ collection, tokenId })
    const snapshot = await getNftSnapshot(nftIndex)
    if (isNil(snapshot)) {
      pinoLogger.error(`NFT with index ${JSON.stringify(nftIndex)} not found`)
      return
    }
    await deleteNft(snapshot.id)
    pinoLogger.info(`[OUT transfer ${JSON.stringify(nftIndex)}] NFT ${snapshot.id} deleted`)
  } catch (err) {
    pinoLogger.error(`processOutTransfer error: ${errorMessage(err)}`)
  }
}
