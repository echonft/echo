import { getUserById } from '@echo/firestore/crud/user/get-user-by-id'
import { getUserFromFirestoreData } from '@echo/firestore/helpers/user/get-user-from-firestore-data'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { getCollectionSwitch } from '@echo/frontend/lib/helpers/webhook/get-collection-switch'
import { updateNftSwitch } from '@echo/frontend/lib/helpers/webhook/update-nft-switch'
import type { TransferData } from '@echo/frontend/lib/types/transfer/transfer-data'
import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import { isNil } from 'ramda'

/**
 * Processes the transfer of an NFT from a user in our database to another user in our database.
 * Modifies the NFT ownership
 *
 * @param {Omit<TransferData, 'to'> & { to: WalletDocumentData }} args
 */
export async function processSwapTransfer(args: Omit<TransferData, 'to'> & { to: WalletDocumentData }): Promise<void> {
  const { contractAddress, chain, to, tokenId } = args
  const userDocumentData = await getUserById(to.userId)
  if (isNil(userDocumentData)) {
    return
  }
  const user = getUserFromFirestoreData(userDocumentData, to)
  const collection = await getCollectionSwitch({ chain, address: contractAddress })
  const nftIndex = getNftIndex({ collection, tokenId })
  await updateNftSwitch({ nftIndex, owner: user, collection, chain })
}
