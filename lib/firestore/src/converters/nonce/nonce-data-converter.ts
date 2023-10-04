import { assocExpiredProp } from '@echo/firestore/helpers/converters/from-firestore/assoc-expired-prop'
import { getSnapshotData } from '@echo/firestore/helpers/converters/from-firestore/get-snapshot-data'
import type { FirestoreNonce } from '@echo/firestore/types/model/nonce/firestore-nonce'
import type { NonceDocumentData } from '@echo/firestore/types/model/nonce/nonce-document-data'
import { modifyDatePropToNumber } from '@echo/utils/fp/modify-date-prop-to-number'
import { modifyNumberPropToDate } from '@echo/utils/fp/modify-number-prop-to-date'
import type { FirestoreDataConverter, QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { PartialWithFieldValue } from 'firebase-admin/lib/firestore'
import { dissoc, pipe } from 'ramda'

export const nonceDataConverter: FirestoreDataConverter<FirestoreNonce> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<NonceDocumentData>) {
    return pipe(getSnapshotData<NonceDocumentData>, assocExpiredProp, modifyNumberPropToDate('expiresAt'))(snapshot)
  },
  toFirestore(modelObject: PartialWithFieldValue<FirestoreNonce>) {
    return pipe(
      dissoc('expired'),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      modifyDatePropToNumber('expiresAt')
    )(modelObject)
  }
}
