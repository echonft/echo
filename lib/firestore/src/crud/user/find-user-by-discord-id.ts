import { CollectionName } from '../../constants/collection-name'
import { userDataConverter } from '../../converters/user-data-converter'
import { firestore } from '../../services/firestore'

export const findUserByDiscordId = async (discordId: string) => {
  const querySnapshot = await firestore()
    .collection(CollectionName.USERS)
    .where('discordId', '==', discordId)
    .withConverter(userDataConverter)
    .get()

  if (querySnapshot.empty) {
    return undefined
  }

  return querySnapshot.docs[0]!.data()
}
