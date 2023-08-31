import { ServerError } from '../error/server-error'
import { findNftById as firestoreFindNftById } from '@echo/firestore'

export const findNftById = async (id: string) => {
  try {
    return await firestoreFindNftById(id)
  } catch (e) {
    throw new ServerError('Error fetching NFT')
  }
}
