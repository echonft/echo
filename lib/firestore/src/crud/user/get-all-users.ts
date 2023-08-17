import { CollectionName } from '../../constants/collection-name'
import { userDataConverter } from '../../converters/user-data-converter'
import { firestore } from '../../services/firestore'
import { User } from '../../types/model/user'
import { map } from 'ramda'

export const getAllUsers = async (): Promise<User[]> => {
  const querySnapshot = await firestore().collection(CollectionName.USERS).withConverter(userDataConverter).get()
  return map((doc) => doc.data(), querySnapshot.docs)
}
