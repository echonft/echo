import { getNftsCollection } from '@echo/firestore/helpers/collection/get-nfts-collection'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/get-query-snapshot-document-data'

export async function findNftByCollection(collectionSlug: string, tokenId: number) {
  const querySnapshot = await getNftsCollection()
    .where('tokenId', '==', tokenId)
    .where('collection.slug', '==', collectionSlug)
    .get()

  return getQuerySnapshotDocumentData(querySnapshot)
}
