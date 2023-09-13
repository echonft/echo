import { getNftCollectionSnapshotById } from '@echo/firestore/crud/nft-collection/get-nft-collection-snapshot-by-id'

export async function findNftCollectionById(id: string) {
  const documentSnapshot = await getNftCollectionSnapshotById(id)
  return documentSnapshot?.data()
}
