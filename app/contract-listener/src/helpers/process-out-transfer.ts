import { getCollection } from '@echo/contract-listener/helpers/get-collection'
import { mapCollectionTokenIdToNftIndex } from '@echo/contract-listener/mappers/map-collection-token-id-to-nft-index'
import type { TransferData } from '@echo/contract-listener/types/transfer-data'
import { deleteCollection } from '@echo/firestore/crud/collection/delete-collection'
import { getCollectionSnapshot } from '@echo/firestore/crud/collection/get-collection'
import { deleteNft } from '@echo/firestore/crud/nft/delete-nft'
import { getNftSnapshot } from '@echo/firestore/crud/nft/get-nft'
import { getNftsForCollection } from '@echo/firestore/crud/nft/get-nfts-for-collection'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import { isEmpty, isNil } from 'ramda'

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
    const nftIndex = mapCollectionTokenIdToNftIndex({ collection, tokenId })
    const snapshot = await getNftSnapshot(nftIndex)
    if (isNil(snapshot)) {
      pinoLogger.error(`NFT with index ${JSON.stringify(nftIndex)} not found`)
      return
    }
    const { slug } = collection
    await deleteNft(snapshot.id)
    pinoLogger.info(`[OUT transfer ${JSON.stringify(nftIndex)}] NFT ${snapshot.id} deleted`)

    // If collection is now empty, delete it
    const collectionNfts = await getNftsForCollection(slug)
    if (isEmpty(collectionNfts)) {
      const collectionSnapshot = await getCollectionSnapshot(slug)
      if (isNil(collectionSnapshot)) {
        pinoLogger.info(`[OUT transfer ${JSON.stringify(nftIndex)}] collection ${slug} not found`)
        return
      }
      await deleteCollection(collectionSnapshot.id)
      pinoLogger.info(`[OUT transfer ${JSON.stringify(nftIndex)}] collection ${collectionSnapshot.id} deleted`)
    }
  } catch (err) {
    pinoLogger.error(`processOutTransfer error: ${errorMessage(err)}`)
  }
}
