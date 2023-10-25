import { getAllCollectionSwapsCounts as firestoreGetAllCollectionSwapsCounts } from '@echo/firestore/test/test-utils/collection-swaps-count/get-all-collection-swaps-counts'
import { ServerError } from '@echo/frontend/lib/server/helpers/error/server-error'

export async function getAllCollectionSwapsCounts() {
  try {
    return await firestoreGetAllCollectionSwapsCounts()
  } catch (e) {
    throw new ServerError(`error getting all collection swaps counts`, e)
  }
}
