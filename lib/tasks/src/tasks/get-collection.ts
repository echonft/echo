import { getCollectionByContract as getCollectionByAddressFromFirestore } from '@echo/firestore/crud/collection/get-collection-by-contract'
import type { Address } from '@echo/model/types/address'
import type { Collection } from '@echo/model/types/collection'
import { info } from '@echo/tasks/helpers/logger'
import { fetchCollection } from '@echo/tasks/tasks/fetch-collection'
import type { Nullable } from '@echo/utils/types/nullable'
import { always, andThen, applySpec, identity, isNil, pipe } from 'ramda'

interface GetCollectionReturn {
  collection: Nullable<Collection>
  source: 'firestore' | 'api'
}

/**
 * Get a collection from Firestore, and if it doesn't exist, from the API
 * @param contract
 */
export async function getCollection(contract: Address): Promise<GetCollectionReturn> {
  info({ collection: { contract } }, 'getting collection')
  const collection = await getCollectionByAddressFromFirestore(contract)
  if (isNil(collection)) {
    return pipe(
      fetchCollection,
      andThen(
        applySpec<GetCollectionReturn>({
          collection: identity,
          source: always('api')
        })
      )
    )(contract)
  }
  return { collection, source: 'firestore' }
}
