import { getNftCollectionSwapsCountSnapshotById } from '@echo/firestore/crud/nft-collection-swaps-count/get-nft-collection-swaps-count-snapshot-by-id'
import type { FirestoreNftCollectionSwapsCount } from '@echo/firestore/types/model/nft-collection-swaps-count/firestore-nft-collection-swaps-count'

export async function findNftCollectionSwapsCountById(
  id: string
): Promise<FirestoreNftCollectionSwapsCount | undefined> {
  const querySnapshot = await getNftCollectionSwapsCountSnapshotById(id)
  return querySnapshot?.data()
}
