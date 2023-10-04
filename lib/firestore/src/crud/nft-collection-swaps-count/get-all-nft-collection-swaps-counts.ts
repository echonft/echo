import { getNftCollectionSwapsCountCollection } from '@echo/firestore/helpers/collection/get-nft-collection-swaps-count-collection'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'

export async function getAllNftCollectionSwapsCounts() {
  const querySnapshot = await getNftCollectionSwapsCountCollection().get()
  return getQuerySnapshotDocumentsData(querySnapshot)
}
