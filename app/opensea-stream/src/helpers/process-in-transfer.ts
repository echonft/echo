import { getUserById } from '@echo/firestore/crud/user/get-user-by-id'
import { getUserFromFirestoreData } from '@echo/firestore/helpers/user/get-user-from-firestore-data'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import type { NftIndex } from '@echo/model/types/nft-index'
import { getCollection } from '@echo/opensea-stream/helpers/get-collection'
import { updateNft } from '@echo/opensea-stream/helpers/update-nft'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { isTestnetChain } from '@echo/utils/helpers/is-testnet-chain'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import { isNil } from 'ramda'

/**
 * Processes the transfer of an NFT from a foreign user to a user in our database.
 * Checks if NFT exists (shouldn't be the case or else it'd be a swap) and updates it if needed
 * Otherwise checks if the collection exists, and if not, create it and then add the NFT to it
 *
 * @param {Wallet} to - The wallet the NFT is transferred to.
 * @param {NftIndex} nftIndex - The index of the NFT transferred.
 * @returns {Promise<void>} */
export async function processInTransfer(to: WalletDocumentData, nftIndex: NftIndex): Promise<void> {
  pinoLogger.info(`IN transfer for ${JSON.stringify(nftIndex)} to wallet ${JSON.stringify(to)}, processing...`)
  try {
    const userDocumentData = await getUserById(to.userId)
    if (isNil(userDocumentData)) {
      pinoLogger.error(`[IN transfer ${JSON.stringify(nftIndex)}] user ${to.userId} not found`)
      return
    }
    const user = getUserFromFirestoreData(userDocumentData, to)
    const collection = await getCollection({ slug: nftIndex.collection.slug, testnet: isTestnetChain(to.chain) })
    await updateNft({ nftIndex, owner: user, collection, chain: to.chain })
  } catch (err) {
    pinoLogger.error(`processInTransfer error: ${errorMessage(err)}`)
  }
}
