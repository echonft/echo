import { getSwapSnapshotById } from './get-swap-snapshot-by-id'

export const findSwapById = async (id: string) => {
  const documentSnapshot = await getSwapSnapshotById(id)
  return documentSnapshot?.data()
}
