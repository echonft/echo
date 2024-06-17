import { getUserById } from '@echo/firestore/crud/user/get-user-by-id'
import { getUserFromFirestoreData } from '@echo/firestore/helpers/user/get-user-from-firestore-data'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { getCollection } from '@echo/frontend/lib/helpers/webhook/get-collection'
import { updateNft } from '@echo/frontend/lib/helpers/webhook/update-nft'
import type { TransferData } from '@echo/frontend/lib/types/transfer/transfer-data'
import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { isNil } from 'ramda'

/**
 * Processes the transfer of an NFT from a user in our database to another user in our database.
 * Modifies the NFT ownership
 */
export async function processSwapTransfer(
  args: WithLoggerType<Record<'transfer', Omit<TransferData, 'to'> & Record<'to', WalletDocumentData>>>
): Promise<void> {
  const {
    transfer: { contract, to, tokenId },
    logger
  } = args
  const userDocumentData = await getUserById(to.userId)
  if (isNil(userDocumentData)) {
    return
  }
  const user = getUserFromFirestoreData(userDocumentData, to)
  const collection = await getCollection({ contract, logger })
  const nftIndex = getNftIndex({ collection, tokenId })
  await updateNft({ nftIndex, owner: user, collection })
}
