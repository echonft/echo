import { getCollectionByAddress as getCollectionByAddressFromFirestore } from '@echo/firestore/crud/collection/get-collection-by-address'
import type { Collection } from '@echo/model/types/collection'
import type { Contract } from '@echo/model/types/contract'
import { error, info } from '@echo/tasks/helpers/logger'
import { fetchCollection } from '@echo/tasks/tasks/fetch-collection'
import type { Nullable } from '@echo/utils/types/nullable'
import { always, andThen, assoc, ifElse, isNil, objOf, otherwise, pipe } from 'ramda'

interface GetCollectionReturn {
  collection: Nullable<Collection>
  source: 'firestore' | 'api'
}

/**
 * Get a collection from Firestore, and if it doesn't exist, from the API
 * @param contract
 */
export async function getCollection(contract: Contract): Promise<GetCollectionReturn> {
  info({ collection: { contract } }, 'getting collection')
  const collection = await pipe(
    getCollectionByAddressFromFirestore,
    otherwise((err) => {
      error({ err, collection: { contract } }, 'could not get collection from Firestore')
      return undefined
    })
  )(contract)
  if (isNil(collection)) {
    return pipe(
      fetchCollection,
      andThen(
        ifElse(
          isNil<Nullable<Collection>>,
          always<GetCollectionReturn>({
            collection: undefined,
            source: 'api'
          }),
          pipe<[Collection], Omit<GetCollectionReturn, 'source'>, GetCollectionReturn>(
            objOf('collection'),
            assoc('source', 'api')
          )
        )
      ),
      otherwise((err) => {
        error({ err, collection: { contract } }, 'could not fetch collection')
        return {
          collection: undefined,
          source: 'api'
        }
      })
    )(contract)
  }
  return { collection, source: 'firestore' }
}
