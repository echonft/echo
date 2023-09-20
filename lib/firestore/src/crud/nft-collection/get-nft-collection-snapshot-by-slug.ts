import { CollectionName } from '@echo/firestore/constants/collection-name'
import { nftCollectionDataConverter } from '@echo/firestore/converters/nft-collection-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreNftCollection } from '@echo/firestore/types/model/firestore-nft-collection'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { head } from 'ramda'

export async function getNftCollectionSnapshotBySlug(slug: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.NFT_COLLECTIONS)
    .where('slug', '==', slug)
    .withConverter(nftCollectionDataConverter)
    .get()

  if (querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)) {
    return undefined
  }

  return head(querySnapshot.docs) as QueryDocumentSnapshot<FirestoreNftCollection>
}
