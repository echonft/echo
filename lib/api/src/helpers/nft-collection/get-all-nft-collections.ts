import { ApiError } from '../api-error'
import { getAllNftCollections as firestoreGetAllNftCollections } from '@echo/firestore'

export const getAllNftCollections = async () => {
  try {
    return await firestoreGetAllNftCollections()
  } catch (e) {
    throw new ApiError(500, 'Error fetching collections')
  }
}
