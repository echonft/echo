import { getAllCollections as firestoreGetAllCollections } from '@echo/firestore/crud/collection/get-all-collections'
import { type QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { ServerError } from '@server/helpers/error/server-error'

export async function getAllCollections(constraints?: QueryConstraints) {
  try {
    return await firestoreGetAllCollections(constraints)
  } catch (e) {
    throw new ServerError(`error getting all collections with constraints ${JSON.stringify(constraints)}`, e)
  }
}
