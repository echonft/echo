import { CollectionName } from '../../constants/collection-name'
import { userDataConverter } from '../../converters/user-data-converter'
import { firestore } from '../../services/firestore'
import { User } from '../../types/model/user'

export const addUser = async (user: Omit<User, 'id'>): Promise<string> => {
  const userReference = firestore().collection(CollectionName.USERS).doc()
  const id = userReference.id
  await userReference.set(userDataConverter.toFirestore({ ...user, id }))
  return id
}
