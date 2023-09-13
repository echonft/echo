import { CollectionName } from '@echo/firestore/constants/collection-name'
import { nftDataConverter } from '@echo/firestore/converters/nft-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreNft } from '@echo/firestore/types/model/firestore-nft'
import { invoker, map } from 'ramda'

export async function getAllNfts() {
  const querySnapshot = await firestoreApp().collection(CollectionName.NFTS).withConverter(nftDataConverter).get()
  return map(invoker(0, 'data'), querySnapshot.docs) as FirestoreNft[]
}
