import { setExpiredProp } from '@echo/firestore/helpers/converters/nonce/from-firestore/set-expired-prop'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { type Nonce } from '@echo/firestore/types/model/nonce/nonce'
import { type NonceDocumentData } from '@echo/firestore/types/model/nonce/nonce-document-data'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { type FirestoreDataConverter, QueryDocumentSnapshot, type WithFieldValue } from 'firebase-admin/firestore'
import { dissoc, pipe } from 'ramda'

export const nonceDataConverter: FirestoreDataConverter<Nonce, NonceDocumentData> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<NonceDocumentData, NonceDocumentData>): Nonce {
    return pipe(
      nonNullableReturn(getDocumentSnapshotData<NonceDocumentData, NonceDocumentData>),
      setExpiredProp
    )(snapshot)
  },
  toFirestore(modelObject: WithFieldValue<Nonce>): WithFieldValue<Nonce> {
    return dissoc('expired', modelObject) as WithFieldValue<Nonce>
  }
}
