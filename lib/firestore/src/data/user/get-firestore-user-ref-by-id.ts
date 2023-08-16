import { CollectionName } from '../../constants/collection-name'
import { getDocRefFromPath } from '../../helpers/document/get-doc-ref-from-path'
import { FirestoreUser } from '../../types/model/collections/user/firestore-user'
import { DocumentReference } from 'firebase-admin/firestore'

export const getFirestoreUserRefById = (id: string): DocumentReference<FirestoreUser> =>
  getDocRefFromPath(CollectionName.USERS, id)
