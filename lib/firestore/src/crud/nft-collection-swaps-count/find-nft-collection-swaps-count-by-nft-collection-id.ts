import { getNftCollectionSwapsCountSnapshotByCollectionId } from '@echo/firestore/crud/nft-collection-swaps-count/get-nft-collection-swaps-count-snapshot-by-collection-id'
import type { FirestoreNftCollectionSwapsCount } from '@echo/firestore/types/model/nft-collection-swaps-count/firestore-nft-collection-swaps-count'

export async function findNftCollectionSwapsCountByNftCollectionId(
  collectionId: string
): Promise<FirestoreNftCollectionSwapsCount | undefined> {
  const querySnapshot = await getNftCollectionSwapsCountSnapshotByCollectionId(collectionId)
  return querySnapshot?.data()
}
