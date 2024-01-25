import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { getQueriesDocuments } from '@echo/firestore/helpers/crud/query/get-queries-documents'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { ListingDocumentData } from '@echo/firestore/types/model/listing/listing-document-data'
import { type Listing } from '@echo/model/types/listing'
import type { Nft } from '@echo/model/types/nft'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import type { CollectionReference, Query } from 'firebase-admin/firestore'
import { andThen, isEmpty, juxt, map, partial, path, pipe, prop, reject, splitEvery, uniq } from 'ramda'

export async function getPendingListingsForUser(username: string): Promise<Listing[]> {
  const nfts = await getNftsForOwner(username)
  if (isEmpty(nfts)) {
    return []
  }
  const collectionIds = pipe<[Nft[]], string[], string[], string[][]>(
    map<Nft, string>(nonNullableReturn(path<string>(['collection', 'id']))),
    uniq,
    splitEvery(30)
  )(nfts)
  return pipe<
    [],
    CollectionReference<Listing, ListingDocumentData>,
    Query<Listing>,
    Query<Listing>,
    Query<Listing>,
    Query<Listing>[],
    Promise<Listing[]>,
    Promise<Listing[]>
  >(
    getListingsCollectionReference,
    queryWhere('creator.username', '!=', username),
    queryOrderBy('creator.username'),
    queryOrderBy('expiresAt', 'desc'),
    juxt(map(partial(queryWhere<Listing>, ['targetsIds', 'array-contains-any']), collectionIds)),
    getQueriesDocuments<Listing>,
    andThen(reject<Listing>(prop('readOnly')))
  )()
}
