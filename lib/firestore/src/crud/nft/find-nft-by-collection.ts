import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-document-data'

export async function findNftByCollection(collectionSlug: string, tokenId: number) {
  const querySnapshot = await getNftsCollectionReference()
    .where('tokenId', '==', tokenId)
    .where('collection.slug', '==', collectionSlug)
    .get()
  return getQuerySnapshotDocumentData(querySnapshot)
}
