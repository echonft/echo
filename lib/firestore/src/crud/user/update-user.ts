import { CollectionName } from '../../constants/collection-name'
import { userDataConverter } from '../../converters/user-data-converter'
import { firestore } from '../../services/firestore'
import { FirestoreModel } from '../../types/abstract/firestore-model'
import { User } from '../../types/model/user'
import { WriteResult } from 'firebase-admin/firestore'

export const updateUser = (userId: string, user: FirestoreModel<User>): Promise<WriteResult> => {
  const userReference = firestore().collection(CollectionName.USERS).doc(userId)
  return userReference.withConverter(userDataConverter).update(user)
}
