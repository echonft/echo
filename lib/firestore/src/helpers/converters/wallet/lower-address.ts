import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import type { WithFieldValue } from 'firebase-admin/firestore'
import { modify, toLower } from 'ramda'

type Args = WalletDocumentData | WithFieldValue<WalletDocumentData>
export function lowerAddress<T extends Args>(wallet: T) {
  return modify('address', toLower, wallet) as T
}
