import { getNftSnapshotById } from '@echo/firestore/crud/nft/get-nft-snapshot-by-id'

export async function findNftById(id: string) {
  const documentSnapshot = await getNftSnapshotById(id)
  return documentSnapshot?.data()
}
