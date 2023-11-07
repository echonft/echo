import { getAllCollections } from '@echo/firestore/crud/collection/get-all-collections'
import { type QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { ServerError } from '@echo/frontend/lib/server/helpers/error/server-error'
import type { Collection } from '@echo/model/types/collection'

export async function guarded_getAllCollections(constraints?: QueryConstraints<Collection>) {
  try {
    return await getAllCollections(constraints)
  } catch (e) {
    throw new ServerError(`error getting all collections with constraints ${JSON.stringify(constraints)}`, e)
  }
}
