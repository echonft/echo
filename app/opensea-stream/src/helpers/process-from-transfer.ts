import { deleteCollection } from '@echo/firestore/crud/collection/delete-collection'
import { getCollectionSnapshot } from '@echo/firestore/crud/collection/get-collection'
import { deleteNft } from '@echo/firestore/crud/nft/delete-nft'
import { getNftSnapshot } from '@echo/firestore/crud/nft/get-nft'
import { getNftsForCollection } from '@echo/firestore/crud/nft/get-nfts-for-collection'
import type { NftIndex } from '@echo/model/types/nft-index'
import { isEmpty, isNil } from 'ramda'

/**
 * Processes the from transfer of an NFT.
 * Deletes the NFT and its collection if necessary.
 *
 * @param {NftIndex} nftIndex - The index of the NFT to process.
 */
export async function processFromTransfer(nftIndex: NftIndex) {
  const snapshot = await getNftSnapshot(nftIndex)
  // Shouldn't happen
  if (isNil(snapshot)) {
    return
  }
  const {
    collection: { slug }
  } = snapshot.data()
  // Since this is a from transfer, the NFT was transferred to someone not in our DB
  await deleteNft(snapshot.id)

  const collectionNfts = await getNftsForCollection(slug)
  // If collection is now empty, delete it
  if (isEmpty(collectionNfts)) {
    const collectionSnapshot = await getCollectionSnapshot(slug)

    // Shouldn't happen
    if (isNil(collectionSnapshot)) {
      return
    }
    await deleteCollection(collectionSnapshot.id)
  }
}
