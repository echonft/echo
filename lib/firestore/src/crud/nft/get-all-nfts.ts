import { getNftsCollection } from '@echo/firestore/helpers/collection/get-nfts-collection'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'

export async function getAllNfts() {
  const querySnapshot = await getNftsCollection().get()
  return getQuerySnapshotDocumentsData(querySnapshot)
}
