import { CollectionName } from '@echo/firestore/constants/collection-name'
import { nftDataConverter } from '@echo/firestore/converters/nft/nft-data-converter'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/get-query-snapshot-document-data'
import { firestoreApp } from '@echo/firestore/services/firestore-app'

export async function findNftByCollection(collectionSlug: string, tokenId: number) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.NFTS)
    .where('tokenId', '==', tokenId)
    .where('collection.slug', '==', collectionSlug)
    .withConverter(nftDataConverter)
    .get()

  return getQuerySnapshotDocumentData(querySnapshot)
}
