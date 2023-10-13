import { getNftCollectionSwapsCountSnapshotByCollectionId } from '@echo/firestore/crud/nft-collection-swaps-count/get-nft-collection-swaps-count-snapshot-by-collection-id'
import type { CollectionSwapsCount } from '@echo/firestore/types/model/collection-swaps-count/collection-swaps-count'

export async function findNftCollectionSwapsCountByNftCollectionId(
  collectionId: string
): Promise<CollectionSwapsCount | undefined> {
  const querySnapshot = await getNftCollectionSwapsCountSnapshotByCollectionId(collectionId)
  return querySnapshot?.data()
}
