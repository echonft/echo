import { deleteNft } from '@echo/firestore/crud/nft/delete-nft'
import { getNftSnapshot } from '@echo/firestore/crud/nft/get-nft'
import { getCollectionSwitch } from '@echo/frontend/lib/helpers/webhook/get-collection-switch'
import type { TransferData } from '@echo/frontend/lib/types/transfer/transfer-data'
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
  const collection = await getCollectionSwitch({ chain, address: contractAddress })
  const nftIndex = getNftIndex({ collection, tokenId })
  const snapshot = await getNftSnapshot(nftIndex)
  if (isNil(snapshot)) {
    return
  }
  await deleteNft(snapshot.id)
}
