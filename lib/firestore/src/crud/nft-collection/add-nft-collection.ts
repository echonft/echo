import { CollectionName } from '@echo/firestore/constants/collection-name'
import { nftCollectionDataConverter } from '@echo/firestore/converters/nft-collection/nft-collection-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreNftCollection } from '@echo/firestore/types/model/nft-collection/firestore-nft-collection'

export async function addNftCollection(nftCollection: Omit<FirestoreNftCollection, 'id'>): Promise<string> {
  const reference = firestoreApp().collection(CollectionName.NFT_COLLECTIONS).doc()
  const id = reference.id
  await reference.set(nftCollectionDataConverter.toFirestore({ ...nftCollection, id }))
  return id
}
