import { lowerUsernameIfExists } from '@echo/firestore/helpers/converters/user/to-firestore/lower-username-if-exists'
import type { UserDocumentData } from '@echo/firestore/types/model/user-document-data'
import { type FirestoreDataConverter, QueryDocumentSnapshot, type WithFieldValue } from 'firebase-admin/firestore'

export const userDataConverter: FirestoreDataConverter<UserDocumentData, UserDocumentData> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<UserDocumentData, UserDocumentData>): UserDocumentData {
    return snapshot.data()
  },
  toFirestore(modelObject: WithFieldValue<UserDocumentData>): WithFieldValue<UserDocumentData> {
    return lowerUsernameIfExists(modelObject)
  }
}
