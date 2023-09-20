import { getWalletSnapshotById } from '@echo/firestore/crud/wallet/get-wallet-snapshot-by-id'
import type { WriteResult } from 'firebase-admin/lib/firestore'
import { isNil } from 'ramda'

export async function deleteWallet(id: string): Promise<WriteResult> {
  const documentSnapshot = await getWalletSnapshotById(id)
  if (isNil(documentSnapshot)) {
    throw Error(`wallet with id ${id} does not exist`)
  }
  return documentSnapshot.ref.delete()
}
