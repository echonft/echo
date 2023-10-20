import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'

export async function getAllNfts() {
  const querySnapshot = await getNftsCollectionReference().get()
  return getQuerySnapshotDocumentsData(querySnapshot)
}
