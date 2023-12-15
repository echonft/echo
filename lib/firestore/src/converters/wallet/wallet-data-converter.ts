import { getSnapshotData } from '@echo/firestore/helpers/converters/from-firestore/get-snapshot-data'
import { modifyWhenHas } from '@echo/firestore/helpers/converters/to-firestore/modify-when-has'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import type { HexString } from '@echo/utils/types/hex-string'
import {
  type FirestoreDataConverter,
  type PartialWithFieldValue,
  QueryDocumentSnapshot
} from 'firebase-admin/firestore'
import { modify, pipe, toLower } from 'ramda'

type PartialWallet = WalletDocumentData | (PartialWithFieldValue<WalletDocumentData> & Record<'address', HexString>)
function modifyAddress<T extends PartialWallet>(wallet: T) {
  return modify('address', toLower<HexString>, wallet)
}

export const walletDataConverter: FirestoreDataConverter<WalletDocumentData> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<WalletDocumentData>) {
    return pipe(getSnapshotData<WalletDocumentData>, modifyAddress)(snapshot)
  },
  toFirestore(modelObject: PartialWithFieldValue<WalletDocumentData>) {
    return modifyWhenHas<WalletDocumentData, 'address', HexString, Lowercase<HexString>>(modifyAddress)(modelObject)
  }
}
