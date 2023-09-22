import { CollectionName } from '@echo/firestore/constants/collection-name'
import { nftDataConverter } from '@echo/firestore/converters/nft/nft-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreNft } from '@echo/firestore/types/model/nft/firestore-nft'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { map } from 'ramda'

export async function findNftsByIds(ids: string[]) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.NFTS)
    .where('id', 'in', ids)
    .withConverter(nftDataConverter)
    .get()

  if (querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)) {
    return [] as FirestoreNft[]
  }

  return map((snapshot) => snapshot.data(), querySnapshot.docs)
}
