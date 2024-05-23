import { getUserById } from '@echo/firestore/crud/user/get-user-by-id'
import { getWalletSnapshotByAddress } from '@echo/firestore/crud/wallet/get-wallet-by-address'
import type { NftIndex } from '@echo/model/types/nft-index'
import type { Wallet } from '@echo/model/types/wallet'
import { addCollectionIfNeeded } from '@echo/opensea-stream/helpers/add-collection-if-needed'
import { addNftIfNeeded } from '@echo/opensea-stream/helpers/add-nft-if-needed'
import { mapUserDocumentDataToUser } from '@echo/opensea-stream/mappers/map-user-document-data-to-user'
import { isNil } from 'ramda'

/**
 * Processes the to transfer of an NFT.
 * Will check if NFT exists (shouldn't be the case else it'd be a swap) annd update if needed
 * Otherwise will check if collection exists, create it and then add the NFT to it
 *
 * @param {Wallet} to - The wallet the NFT is transferred to.
 * @param {NftIndex} nftIndex - The index of the NFT transferred.
 *
 * @returns {Promise} - A promise that resolves when the transfer is*/
export async function processToTransfer(to: Wallet, nftIndex: NftIndex) {
  const walletData = await getWalletSnapshotByAddress(to)
  // Shouldn't happen
  if (isNil(walletData)) {
    return
  }

  const userDocumentData = await getUserById(walletData.data().userId)
  // Shouldn't happen
  if (isNil(userDocumentData)) {
    return
  }

  const user = mapUserDocumentDataToUser({ user: userDocumentData, wallet: to })
  const collection = await addCollectionIfNeeded(nftIndex.collection.slug)
  await addNftIfNeeded({ nftIndex, owner: user, collection, chain: to.chain })
}
