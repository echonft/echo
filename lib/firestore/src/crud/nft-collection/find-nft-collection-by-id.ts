import { getNftCollectionSnapshotById } from './get-nft-collection-snapshot-by-id'

export const findNftCollectionById = async (id: string) => {
  const documentSnapshot = await getNftCollectionSnapshotById(id)
  return documentSnapshot.data()
}
