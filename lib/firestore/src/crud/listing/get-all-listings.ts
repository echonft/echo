import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import type { Listing } from '@echo/model/types/listing/listing'
import { pipe } from 'ramda'

export function getAllListings(): Promise<Listing[]> {
  return pipe(getListingsCollectionReference, getQueryData)()
}
