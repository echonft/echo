import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { getQueryUniqueData } from '@echo/firestore/helpers/crud/query/get-query-unique-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { Listing } from '@echo/model/types/listing'
import { pipe } from 'ramda'

export function findListingById(id: string): Promise<Listing | undefined> {
  return pipe(getListingsCollectionReference, queryWhere('id', '==', id), getQueryUniqueData)()
}
