import { getWalletsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-wallets-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import { type WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { WriteResult } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export async function unchecked_updateWallet(
  id: string,
  data: Partial<Omit<WalletDocumentData, 'id'>>
): Promise<WriteResult> {
  return pipe(getWalletsCollectionReference, updateReference(id, data))()
}
