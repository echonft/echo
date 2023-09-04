import { CollectionName } from '../../constants/collection-name'
import { userDataConverter } from '../../converters/user-data-converter'
import { firestore } from '../../services/firestore'
import { User } from '@echo/firestore-types'
import { invoker, map } from 'ramda'

export const getAllUsers = async () => {
  const querySnapshot = await firestore().collection(CollectionName.USERS).withConverter(userDataConverter).get()
  return map(invoker(0, 'data'), querySnapshot.docs) as User[]
}
