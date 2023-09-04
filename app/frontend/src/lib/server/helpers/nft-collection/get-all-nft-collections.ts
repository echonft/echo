import { ServerError } from '../error/server-error'
import { getAllNftCollections as firestoreGetAllNftCollections } from '@echo/firestore'

export async function getAllNftCollections() {
  try {
    return await firestoreGetAllNftCollections()
  } catch (e) {
    throw new ServerError('Error fetching collections')
  }
}
