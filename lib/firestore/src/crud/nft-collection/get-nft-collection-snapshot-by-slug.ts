import { CollectionName } from '@echo/firestore/constants/collection-name'
import { nftCollectionDataConverter } from '@echo/firestore/converters/nft-collection-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreNftCollection } from '@echo/firestore/types/model/firestore-nft-collection'
import type { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { head, isNil } from 'ramda'

export async function getNftCollectionSnapshotBySlug(slug: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.NFT_COLLECTIONS)
    .where('slug', '==', slug)
    .withConverter(nftCollectionDataConverter)
    .get()

  if (querySnapshot.empty) {
    return undefined
  }

  const documentSnapshot = head(querySnapshot.docs) as QueryDocumentSnapshot<FirestoreNftCollection>
  if (isNil(documentSnapshot)) {
    return undefined
  }

  return documentSnapshot
}
