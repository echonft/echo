import { CollectionName } from '@echo/firestore/constants/collection-name'
import { nftDataConverter } from '@echo/firestore/converters/nft-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreNft } from '@echo/firestore/types/model/firestore-nft'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { head } from 'ramda'

export async function findNftByCollection(collectionSlug: string, tokenId: number) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.NFTS)
    .where('tokenId', '==', tokenId)
    .where('collection.slug', '==', collectionSlug)
    .withConverter(nftDataConverter)
    .get()

  if (querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)) {
    return undefined
  }

  const documentSnapshot = head(querySnapshot.docs) as QueryDocumentSnapshot<FirestoreNft>
  return documentSnapshot.data()
}
