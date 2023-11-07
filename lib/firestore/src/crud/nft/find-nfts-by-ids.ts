import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-documents-data'

export async function findNftsByIds(ids: string[]) {
  const querySnapshot = await getNftsCollectionReference().where('id', 'in', ids).get()
  return getQuerySnapshotDocumentsData(querySnapshot)
}
