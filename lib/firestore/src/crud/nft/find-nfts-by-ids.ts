import { getNftsCollection } from '@echo/firestore/helpers/collection/get-nfts-collection'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'

export async function findNftsByIds(ids: string[]) {
  const querySnapshot = await getNftsCollection().where('id', 'in', ids).get()
  return getQuerySnapshotDocumentsData(querySnapshot)
}
