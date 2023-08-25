import { ApiError } from '../error/api-error'
import { findNftById as firestoreFindNftById } from '@echo/firestore'

export const findNftById = async (id: string) => {
  try {
    return await firestoreFindNftById(id)
  } catch (e) {
    throw new ApiError(500, 'Error fetching NFT')
  }
}
