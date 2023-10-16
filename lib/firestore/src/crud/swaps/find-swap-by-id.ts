import { getSwapSnapshotById } from '@echo/firestore/crud/swaps/get-swap-snapshot-by-id'
import type { Swap } from '@echo/firestore/types/model/swap/swap'

export async function findSwapById(id: string): Promise<Swap | undefined> {
  const documentSnapshot = await getSwapSnapshotById(id)
  return documentSnapshot?.data()
}
