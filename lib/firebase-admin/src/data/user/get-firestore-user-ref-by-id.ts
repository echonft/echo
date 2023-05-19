import { getDocRefFromPath } from '../../utils/document/get-doc-ref-from-path'
import { CollectionName, FirestoreUser } from '@echo/firestore'
import { DocumentReference } from '@google-cloud/firestore'

export const getFirestoreUserRefById = (id: string): DocumentReference<FirestoreUser> =>
  getDocRefFromPath(CollectionName.USERS, id)
