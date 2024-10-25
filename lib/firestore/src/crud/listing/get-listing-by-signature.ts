import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { getQueryUniqueData } from '@echo/firestore/helpers/crud/query/get-query-unique-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { Listing } from '@echo/model/types/listing'
import type { Nullable } from '@echo/utils/types/nullable'
import { pipe } from 'ramda'

export function getListingBySignature(signature: string): Promise<Nullable<Listing>> {
  return pipe(getListingsCollectionReference, queryWhere('signature', '==', signature), getQueryUniqueData)()
}
