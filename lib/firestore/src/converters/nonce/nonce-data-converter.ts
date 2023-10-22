import { assocExpiredProp } from '@echo/firestore/helpers/converters/from-firestore/assoc-expired-prop'
import { getSnapshotData } from '@echo/firestore/helpers/converters/from-firestore/get-snapshot-data'
import { type Nonce } from '@echo/firestore/types/model/nonce/nonce'
import { type NonceDocumentData } from '@echo/firestore/types/model/nonce/nonce-document-data'
import {
  type FirestoreDataConverter,
  type PartialWithFieldValue,
  type QueryDocumentSnapshot
} from 'firebase-admin/firestore'
import { dissoc, pipe } from 'ramda'

export const nonceDataConverter: FirestoreDataConverter<Nonce> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<NonceDocumentData>) {
    return pipe(getSnapshotData<NonceDocumentData>, assocExpiredProp)(snapshot)
  },
  toFirestore(modelObject: PartialWithFieldValue<Nonce>) {
    return dissoc('expired')(modelObject)
  }
}
