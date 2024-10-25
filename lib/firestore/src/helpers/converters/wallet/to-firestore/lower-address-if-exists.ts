import type { WalletDocumentData } from '@echo/firestore/types/model/wallet-document-data'
import type { Wallet } from '@echo/model/types/wallet'
import type { WithFieldValue } from 'firebase-admin/firestore'
import { has, modify, toLower } from 'ramda'

export function lowerAddressIfExists(modelObject: WithFieldValue<Wallet>): WithFieldValue<WalletDocumentData> {
  if (has('address', modelObject)) {
    return modify('address', toLower, modelObject) as WithFieldValue<WalletDocumentData>
  }
  return modelObject
}
