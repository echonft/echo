import { CollectionName } from '../../constants/collection-name'
import { userDataConverter } from '../../converters/user-data-converter'
import { firestore } from '../../services/firestore'
import { User } from '../../types/model/user'
import { WriteResult } from 'firebase-admin/firestore'

export const addUser = (user: Omit<User, 'id'>): Promise<WriteResult> => {
  const userReference = firestore().collection(CollectionName.USERS).doc()
  return userReference.withConverter(userDataConverter).set({ ...user, id: userReference.id })
}
