import { CollectionName } from '../../config/collection-name'
import { FirestoreUser } from '../../types/model/collections/user/firestore-user'
import { getDocRefFromPath } from '../../utils/document/get-doc-ref-from-path'
import { DocumentReference } from '@google-cloud/firestore'

export const getFirestoreUserRefById = (id: string): DocumentReference<FirestoreUser> =>
  getDocRefFromPath(CollectionName.USERS, id)
