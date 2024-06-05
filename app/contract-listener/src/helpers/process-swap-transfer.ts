import { getCollection } from '@echo/contract-listener/helpers/get-collection'
import { updateNft } from '@echo/contract-listener/helpers/update-nft'
import type { TransferData } from '@echo/contract-listener/types/transfer-data'
import { getUserById } from '@echo/firestore/crud/user/get-user-by-id'
import { getUserFromFirestoreData } from '@echo/firestore/helpers/user/get-user-from-firestore-data'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
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
  console.log(`SWAP transfer for ${contractAddress}:${tokenId}, processing...`)
  const userDocumentData = await getUserById(to.userId)
  if (isNil(userDocumentData)) {
    console.error(`[SWAP transfer ${contractAddress}:${tokenId}] user ${to.userId} not found`)
    return
  }
  const user = getUserFromFirestoreData(userDocumentData, to)
  const collection = await getCollection({ chain, address: contractAddress })
  const nftIndex = getNftIndex({ collection, tokenId })
  await updateNft({ nftIndex, owner: user, collection, chain })
}
