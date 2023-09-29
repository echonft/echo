import { getAllNftCollectionSwapsCounts } from '@echo/firestore/crud/nft-collection-swaps-count/get-all-nft-collection-swaps-counts'
import { ServerError } from '@server/helpers/error/server-error'

export async function getAllCollectionSwapsCounts() {
  try {
    return await getAllNftCollectionSwapsCounts()
  } catch (e) {
    throw new ServerError(`error getting all collection swaps counts`, e)
  }
}
