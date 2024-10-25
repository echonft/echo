import { listingsCollection } from '@echo/firestore/helpers/collection/collections'
import { getQueryUniqueData } from '@echo/firestore/helpers/query/get-query-unique-data'
import { queryWhere } from '@echo/firestore/helpers/query/query-where'
import type { ListingDocument } from '@echo/firestore/types/model/listing-document'
import type { Nullable } from '@echo/utils/types/nullable'
import { pipe } from 'ramda'

export function getListingBySignature(signature: string): Promise<Nullable<ListingDocument>> {
  return pipe(listingsCollection, queryWhere('signature', '==', signature), getQueryUniqueData)()
}
