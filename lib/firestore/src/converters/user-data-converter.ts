import { lowerUsername } from '@echo/firestore/helpers/converters/user/lower-username'
import { lowerUsernameIfExists } from '@echo/firestore/helpers/converters/user/to-firestore/lower-username-if-exists'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import type { UserDocumentData } from '@echo/firestore/types/model/user-document-data'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { type FirestoreDataConverter, QueryDocumentSnapshot, type WithFieldValue } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export const userDataConverter: FirestoreDataConverter<UserDocumentData, UserDocumentData> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<UserDocumentData, UserDocumentData>): UserDocumentData {
    return pipe<[QueryDocumentSnapshot<UserDocumentData, UserDocumentData>], UserDocumentData, UserDocumentData>(
      nonNullableReturn(getDocumentSnapshotData),
      lowerUsername
    )(snapshot)
  },
  toFirestore(modelObject: WithFieldValue<UserDocumentData>): WithFieldValue<UserDocumentData> {
    return lowerUsernameIfExists(modelObject)
  }
}
