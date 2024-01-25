import { getSnapshotData } from '@echo/firestore/helpers/converters/get-snapshot-data'
import { setExpiredProp } from '@echo/firestore/helpers/converters/nonce/from-firestore/set-expired-prop'
import { type Nonce } from '@echo/firestore/types/model/nonce/nonce'
import { type NonceDocumentData } from '@echo/firestore/types/model/nonce/nonce-document-data'
import { type FirestoreDataConverter, QueryDocumentSnapshot, type WithFieldValue } from 'firebase-admin/firestore'
import { dissoc, pipe } from 'ramda'

export const nonceDataConverter: FirestoreDataConverter<Nonce> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<NonceDocumentData>): Nonce {
    return pipe(getSnapshotData<NonceDocumentData>, setExpiredProp)(snapshot)
  },
  toFirestore(modelObject: WithFieldValue<Nonce>): WithFieldValue<Nonce> {
    return dissoc('expired', modelObject) as WithFieldValue<Nonce>
  }
}
