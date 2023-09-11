import { getAllNftCollections as firestoreGetAllNftCollections } from '@echo/firestore'
import type { QueryConstraints } from '@echo/firestore-types'
import { ServerError } from '@server/helpers/error/server-error'

export async function getAllNftCollections(constraints?: QueryConstraints) {
  try {
    return await firestoreGetAllNftCollections(constraints)
  } catch (e) {
    throw new ServerError(`error getting all collections with constraints ${JSON.stringify(constraints)}`, e)
  }
}
