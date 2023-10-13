import { findNftCollectionById } from '@echo/firestore/crud/nft-collection/find-nft-collection-by-id'
import { getNftCollectionSwapsCountSnapshotByCollectionId } from '@echo/firestore/crud/nft-collection-swaps-count/get-nft-collection-swaps-count-snapshot-by-collection-id'
import { getNftCollectionSwapsCountCollection } from '@echo/firestore/helpers/collection/get-nft-collection-swaps-count-collection'
import type { CollectionSwapsCount } from '@echo/firestore/types/model/collection-swaps-count/collection-swaps-count'
import { isNil, mergeLeft } from 'ramda'

export async function increaseNftCollectionSwapsCount(collectionId: string): Promise<CollectionSwapsCount> {
  const nftCollection = await findNftCollectionById(collectionId)
  if (isNil(nftCollection)) {
    throw Error(
      `trying to increase swaps count for nft collection with id ${collectionId} but this collection does not exist`
    )
  }
  const snapshot = await getNftCollectionSwapsCountSnapshotByCollectionId(collectionId)
  if (isNil(snapshot) || isNil(snapshot.data()) || !snapshot.exists) {
    const reference = getNftCollectionSwapsCountCollection().doc()
    const id = reference.id
    const newSwapsCount: CollectionSwapsCount = { id, collectionId, swapsCount: 1 }
    await reference.set(newSwapsCount)
    return newSwapsCount
  }
  const existingSwapsCount = snapshot.data()
  const increasedCount = { swapsCount: existingSwapsCount.swapsCount + 1 }
  await snapshot.ref.update(increasedCount)
  return mergeLeft(increasedCount, existingSwapsCount)
}
