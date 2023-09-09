import { ServerError } from '../error/server-error'
import { setUserNftsUpdated as firestoreSetUserNftsUpdated } from '@echo/firestore'

export const setUserNftsUpdated = async (userId: string) => {
  try {
    return await firestoreSetUserNftsUpdated(userId)
  } catch (e) {
    throw new ServerError(`error setting user with id ${userId} nftsUpdatedAt`, e)
  }
}
