import { getAllNftCollections } from '@echo/firestore/crud/nft-collection/get-all-nft-collections'
import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { ServerError } from '@server/helpers/error/server-error'

export async function getAllCollections(constraints?: QueryConstraints) {
  try {
    return await getAllNftCollections(constraints)
  } catch (e) {
    throw new ServerError(`error getting all collections with constraints ${JSON.stringify(constraints)}`, e)
  }
}
