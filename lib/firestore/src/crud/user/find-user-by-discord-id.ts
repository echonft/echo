import { CollectionName } from '../../constants/collection-name'
import { userDataConverter } from '../../converters/user-data-converter'
import { firestore } from '../../services/firestore'
import { User } from '../../types/model/user'

export const findUserByDiscordId = async (discordId: string): Promise<User> => {
  const querySnapshot = await firestore()
    .collection(CollectionName.USERS)
    .where('discordId', '==', discordId)
    .withConverter(userDataConverter)
    .get()

  if (querySnapshot.empty) {
    return Promise.reject('user not found')
  }

  return querySnapshot.docs[0]!.data()
}
