import { getNftSnapshotById } from '@echo/firestore/crud/nft/get-nft-snapshot-by-id'
import type { Nft } from '@echo/model/types/nft'

export async function findNftById(id: string): Promise<Nft | undefined> {
  const documentSnapshot = await getNftSnapshotById(id)
  return documentSnapshot?.data()
}
