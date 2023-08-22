import { getNftSnapshotById } from './get-nft-snapshot-by-id'

export const findNftById = async (id: string) => {
  const documentSnapshot = await getNftSnapshotById(id)
  return documentSnapshot?.data()
}
