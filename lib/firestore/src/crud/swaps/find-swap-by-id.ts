import { getSwapSnapshotById } from '@echo/firestore/crud/swaps/get-swap-snapshot-by-id'
import type { FirestoreSwap } from '@echo/firestore/types/model/swap/firestore-swap'

export async function findSwapById(id: string): Promise<FirestoreSwap | undefined> {
  const documentSnapshot = await getSwapSnapshotById(id)
  return documentSnapshot?.data()
}
