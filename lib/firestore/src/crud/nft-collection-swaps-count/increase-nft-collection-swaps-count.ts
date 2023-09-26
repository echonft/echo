import { CollectionName } from '@echo/firestore/constants/collection-name'
import { findNftCollectionById } from '@echo/firestore/crud/nft-collection/find-nft-collection-by-id'
import { getNftCollectionSwapsCountSnapshotByCollectionId } from '@echo/firestore/crud/nft-collection-swaps-count/get-nft-collection-swaps-count-snapshot-by-collection-id'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreNftCollectionSwapsCount } from '@echo/firestore/types/model/nft-collection-swaps-count/firestore-nft-collection-swaps-count'
import { isNil, mergeLeft } from 'ramda'

export async function increaseNftCollectionSwapsCount(collectionId: string): Promise<FirestoreNftCollectionSwapsCount> {
  const nftCollection = await findNftCollectionById(collectionId)
  if (isNil(nftCollection)) {
    throw Error(
      `trying to increase swaps count for nft collection with id ${collectionId} but this collection does not exist`
    )
  }
  const snapshot = await getNftCollectionSwapsCountSnapshotByCollectionId(collectionId)
  if (isNil(snapshot)) {
    const reference = firestoreApp().collection(CollectionName.NFT_COLLECTION_SWAPS_COUNT).doc()
    const id = reference.id
    const newSwapsCount: FirestoreNftCollectionSwapsCount = { id, collectionId, swapsCount: 1 }
    await reference.set(newSwapsCount)
    return newSwapsCount
  }
  const existingSwapsCount = snapshot.data()
  const increasedCount = { swapsCount: existingSwapsCount.swapsCount + 1 }
  await snapshot.ref.update(increasedCount)
  return mergeLeft(increasedCount, existingSwapsCount)
}
