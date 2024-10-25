import { lowerAddressIfExists } from '@echo/firestore/helpers/converters/wallet/to-firestore/lower-address-if-exists'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet-document-data'
import type { Wallet } from '@echo/model/types/wallet'
import { QueryDocumentSnapshot, type WithFieldValue } from 'firebase-admin/firestore'
import { dissoc, invoker, pipe } from 'ramda'

export const walletDataConverter = {
  fromDocumentData(documentData: WalletDocumentData): Wallet {
    return dissoc('userId', documentData)
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<WalletDocumentData, WalletDocumentData>): Wallet {
    return pipe<[QueryDocumentSnapshot<WalletDocumentData, WalletDocumentData>], WalletDocumentData, Wallet>(
      invoker(0, 'data'),
      (documentData) => this.fromDocumentData(documentData)
    )(snapshot)
  },
  toFirestore(modelObject: WithFieldValue<Wallet>): WithFieldValue<WalletDocumentData> {
    return lowerAddressIfExists(modelObject)
  }
}
