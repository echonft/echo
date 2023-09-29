import { getSnapshotData } from '@echo/firestore/helpers/converters/from-firestore/get-snapshot-data'
import type { FirestoreWallet } from '@echo/firestore/types/model/wallet/firestore-wallet'
import { modifyStringPropToAddress } from '@echo/utils/fp/modify-string-prop-to-address'
import type { FirestoreDataConverter, QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { PartialWithFieldValue } from 'firebase-admin/lib/firestore'

export const walletDataConverter: FirestoreDataConverter<FirestoreWallet> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<FirestoreWallet>) {
    return getSnapshotData<FirestoreWallet>(snapshot)
  },
  toFirestore(modelObject: PartialWithFieldValue<FirestoreWallet>): FirestoreWallet {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return modifyStringPropToAddress('address', modelObject)
  }
}
