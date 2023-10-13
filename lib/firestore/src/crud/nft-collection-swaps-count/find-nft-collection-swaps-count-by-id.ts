import { getNftCollectionSwapsCountSnapshotById } from '@echo/firestore/crud/nft-collection-swaps-count/get-nft-collection-swaps-count-snapshot-by-id'
import type { CollectionSwapsCount } from '@echo/firestore/types/model/collection-swaps-count/collection-swaps-count'

export async function findNftCollectionSwapsCountById(id: string): Promise<CollectionSwapsCount | undefined> {
  const querySnapshot = await getNftCollectionSwapsCountSnapshotById(id)
  return querySnapshot?.data()
}
