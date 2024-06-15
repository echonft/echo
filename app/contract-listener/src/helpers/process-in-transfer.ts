import { getCollection } from '@echo/contract-listener/helpers/get-collection'
import { updateNft } from '@echo/contract-listener/helpers/update-nft'
import type { TransferData } from '@echo/contract-listener/types/transfer-data'
import { getUserById } from '@echo/firestore/crud/user/get-user-by-id'
import { getUserFromFirestoreData } from '@echo/firestore/helpers/user/get-user-from-firestore-data'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { isNil } from 'ramda'

/**
 * Processes the transfer of an NFT from a foreign user to a user in our database.
 * Checks if NFT exists (shouldn't be the case or else it'd be a swap) and updates it if needed
 * Otherwise checks if the collection exists, and if not, create it and then add the NFT to it
 *
 * @param {Omit<TransferData, 'to'> & { to: WalletDocumentData }} args
 */
export async function processInTransfer(
  args: WithLoggerType<Omit<TransferData, 'to'> & Record<'to', WalletDocumentData>>
): Promise<void> {
  const { contractAddress, chain, to, tokenId, logger } = args
  const fn = 'processInTransfer'
  logger?.info(
    { fn, nft: { collection: { contract: { address: contractAddress, chain: args.chain } } }, to },
    'processing inbound transfer'
  )
  const userDocumentData = await getUserById(to.userId)
  if (isNil(userDocumentData)) {
    logger?.error({ fn, to }, 'user not found')
    return
  }
  const user = getUserFromFirestoreData(userDocumentData, to)
  const collection = await getCollection({ chain, address: contractAddress })
  const nftIndex = getNftIndex({ collection, tokenId })
  await updateNft({ nftIndex, owner: user, collection, chain, logger })
}
