import { getWalletSnapshotById } from '@echo/firestore/crud/wallet/get-wallet-snapshot-by-id'
import { assertQueryDocumentSnapshot } from '@echo/firestore/helpers/crud/assert-query-document-snapshot'
import type { FirestoreWallet } from '@echo/firestore/types/model/wallet/firestore-wallet'
import type { WriteResult } from 'firebase-admin/lib/firestore'

export async function uncheckedUpdateWallet(
  walletId: string,
  updateData: Partial<Omit<FirestoreWallet, 'id'>>
): Promise<WriteResult> {
  const documentSnapshot = await getWalletSnapshotById(walletId)
  assertQueryDocumentSnapshot(documentSnapshot)
  return await documentSnapshot.ref.update(updateData)
}
