import { ServerError } from '../error/server-error'
import { getAllNftCollections as firestoreGetAllNftCollections } from '@echo/firestore'
import { QueryConstraints } from '@echo/firestore-types'

export async function getAllNftCollections(constraints?: QueryConstraints) {
  try {
    return await firestoreGetAllNftCollections(constraints)
  } catch (e) {
    throw new ServerError()
  }
}
