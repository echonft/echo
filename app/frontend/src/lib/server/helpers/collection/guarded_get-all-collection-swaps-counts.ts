import { getAllCollectionSwapsCounts } from '@echo/firestore/test/test-utils/collection-swaps-count/get-all-collection-swaps-counts'
import { ServerError } from '@echo/frontend/lib/server/helpers/error/server-error'

export async function guarded_getAllCollectionSwapsCounts() {
  try {
    return await getAllCollectionSwapsCounts()
  } catch (e) {
    throw new ServerError(`error getting all collection swaps counts`, e)
  }
}
