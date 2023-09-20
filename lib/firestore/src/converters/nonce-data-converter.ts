import { getSnapshotData } from '@echo/firestore/helpers/converters/from-firestore/get-snapshot-data'
import { modifyExpiresAtProp } from '@echo/firestore/helpers/converters/from-firestore/modify-expiresAt-prop'
import type { FirestoreModel } from '@echo/firestore/types/abstract/firestore-model'
import type { FirestoreNonce } from '@echo/firestore/types/model/firestore-nonce'
import type { NonceDocumentData } from '@echo/firestore/types/model/nonce-document-data'
import { modifyDatePropToNumber } from '@echo/utils/fp/modify-date-prop-to-number'
import type { FirestoreDataConverter, QueryDocumentSnapshot, SetOptions } from 'firebase-admin/lib/firestore'
import { dissoc, pipe } from 'ramda'

export const nonceDataConverter: FirestoreDataConverter<Partial<FirestoreNonce>> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<NonceDocumentData>) {
    return pipe(getSnapshotData<NonceDocumentData>, modifyExpiresAtProp)(snapshot)
  },
  toFirestore(modelObject: FirestoreModel<FirestoreNonce>, _options?: SetOptions): NonceDocumentData {
    return pipe(
      dissoc('expired'),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      modifyDatePropToNumber('expiresAt')
    )(modelObject) as NonceDocumentData
  }
}
