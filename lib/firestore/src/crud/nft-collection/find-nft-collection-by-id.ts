import { getNftCollectionSnapshotById } from './get-nft-collection-snapshot-by-id'

export async function findNftCollectionById(id: string) {
  const documentSnapshot = await getNftCollectionSnapshotById(id)
  return documentSnapshot?.data()
}
