import { getNftCollectionsCollection } from '@echo/firestore/helpers/collection/get-nft-collections-collection'
import type { FirestoreNftCollection } from '@echo/firestore/types/model/nft-collection/firestore-nft-collection'

export async function addNftCollection(
  nftCollection: Omit<FirestoreNftCollection, 'id'>
): Promise<FirestoreNftCollection> {
  const reference = getNftCollectionsCollection().doc()
  const id = reference.id
  const newNftCollection = { ...nftCollection, id } as FirestoreNftCollection
  await reference.set(newNftCollection)
  return newNftCollection
}
