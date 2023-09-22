import { getSnapshotData } from '@echo/firestore/helpers/converters/from-firestore/get-snapshot-data'
import type { FirestoreModel } from '@echo/firestore/types/abstract/firestore-model'
import type { FirestoreWallet } from '@echo/firestore/types/model/wallet/firestore-wallet'
import { modifyStringPropToAddress } from '@echo/utils/fp/modify-string-prop-to-address'
import type { FirestoreDataConverter, QueryDocumentSnapshot, SetOptions } from 'firebase-admin/lib/firestore'

export const walletDataConverter: FirestoreDataConverter<Partial<FirestoreWallet>> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<FirestoreWallet>) {
    return getSnapshotData<FirestoreWallet>(snapshot)
  },
  toFirestore(modelObject: FirestoreModel<FirestoreWallet>, _options?: SetOptions): FirestoreWallet {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return modifyStringPropToAddress('address', modelObject)
  }
}
