import { getCollection } from '@echo/contract-listener/helpers/get-collection'
import { updateNft } from '@echo/contract-listener/helpers/update-nft'
import { mapCollectionTokenIdToNftIndex } from '@echo/contract-listener/mappers/map-collection-token-id-to-nft-index'
import type { TransferData } from '@echo/contract-listener/types/transfer-data'
import { getUserById } from '@echo/firestore/crud/user/get-user-by-id'
import { getUserFromFirestoreData } from '@echo/firestore/helpers/user/get-user-from-firestore-data'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import { isNil } from 'ramda'

/**
 * Processes the transfer of an NFT from a foreign user to a user in our database.
 * Checks if NFT exists (shouldn't be the case or else it'd be a swap) and updates it if needed
 * Otherwise checks if the collection exists, and if not, create it and then add the NFT to it
 *
 * @param {Omit<TransferData, 'to'> & { to: WalletDocumentData }} args
 */
export async function processInTransfer(args: Omit<TransferData, 'to'> & { to: WalletDocumentData }): Promise<void> {
  const { contractAddress, chain, to, tokenId } = args
  pinoLogger.info(`IN transfer for ${contractAddress}:${tokenId} to wallet ${JSON.stringify(to)}, processing...`)
  try {
    const userDocumentData = await getUserById(to.userId)
    if (isNil(userDocumentData)) {
      pinoLogger.error(`[IN transfer ${contractAddress}:${tokenId}] user ${to.userId} not found`)
      return
    }
    const user = getUserFromFirestoreData(userDocumentData, to)
    const collection = await getCollection({ chain, address: contractAddress })
    const nftIndex = mapCollectionTokenIdToNftIndex({ collection, tokenId })
    await updateNft({ nftIndex, owner: user, collection, chain })
  } catch (err) {
    pinoLogger.error(`processInTransfer error: ${errorMessage(err)}`)
  }
}
