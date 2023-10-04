import { getNftsCollection } from '@echo/firestore/helpers/collection/get-nfts-collection'
import { getQuerySnapshotDocumentSnapshot } from '@echo/firestore/helpers/crud/get-query-snapshot-document-snapshot'

export async function getNftSnapshotById(id: string) {
  const querySnapshot = await getNftsCollection().where('id', '==', id).get()
  return getQuerySnapshotDocumentSnapshot(querySnapshot)
}
