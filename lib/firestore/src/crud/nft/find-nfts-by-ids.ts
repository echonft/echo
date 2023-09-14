import { CollectionName } from '@echo/firestore/constants/collection-name'
import { nftDataConverter } from '@echo/firestore/converters/nft-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreNft } from '@echo/firestore/types/model/firestore-nft'
import { map } from 'ramda'

export async function findNftsByIds(ids: string[]) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.NFTS)
    .where('id', 'in', ids)
    .withConverter(nftDataConverter)
    .get()

  if (querySnapshot.empty) {
    return [] as FirestoreNft[]
  }

  return map((snapshot) => snapshot.data(), querySnapshot.docs)
}
