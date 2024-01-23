import { getSnapshotData } from '@echo/firestore/helpers/converters/get-snapshot-data'
import type { User } from '@echo/firestore/types/model/user/user'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { type FirestoreDataConverter, QueryDocumentSnapshot, type WithFieldValue } from 'firebase-admin/firestore'
import { dissoc, pipe } from 'ramda'

export const userDataConverter: FirestoreDataConverter<User, UserDocumentData> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<User, UserDocumentData>) {
    const data = getSnapshotData(snapshot)
    return {
      ...data,
      id: snapshot.id,
      createdAt: snapshot.createTime.toMillis(),
      updatedAt: snapshot.updateTime.toMillis()
    }
  },
  toFirestore(modelObject: WithFieldValue<User>) {
    return pipe(dissoc('id'), dissoc('createdAt'), dissoc('updatedAt'))(modelObject)
  }
}
