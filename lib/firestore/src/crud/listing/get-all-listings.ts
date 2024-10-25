import { listingsCollection } from '@echo/firestore/helpers/collection/collections'
import { getQueryData } from '@echo/firestore/helpers/query/get-query-data'
import type { ListingDocument } from '@echo/firestore/types/model/listing-document'
import { pipe } from 'ramda'

export function getAllListings(): Promise<ListingDocument[]> {
  return pipe(listingsCollection, getQueryData)()
}
