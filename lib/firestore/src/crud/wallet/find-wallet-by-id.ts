import { getWalletSnapshotById } from '@echo/firestore/crud/wallet/get-wallet-snapshot-by-id'

export async function findWalletById(id: string) {
  const documentSnapshot = await getWalletSnapshotById(id)
  return documentSnapshot?.data()
}
