import { CollectionName } from '../../constants/collection-name'
import { userDataConverter } from '../../converters/user-data-converter'
import { firestore } from '../../services/firestore'

export const findUserById = async (id: string) => {
  const querySnapshot = await firestore()
    .collection(CollectionName.USERS)
    .where('id', '==', id)
    .withConverter(userDataConverter)
    .get()

  if (querySnapshot.empty) {
    return Promise.reject('user not found')
  }

  return querySnapshot.docs[0]!.data()
}
