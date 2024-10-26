import { collectionsCollection } from '@echo/firestore/helpers/collection/collections'
import { getQueryData } from '@echo/firestore/helpers/query/get-query-data'
import { querySelect } from '@echo/firestore/helpers/query/query-select'
import type { CollectionDocument } from '@echo/firestore/types/model/collection-document'
import { pipe } from 'ramda'

export function getCollectionsSearchData(): Promise<CollectionDocument[]> {
  return pipe(collectionsCollection, querySelect('name', 'pictureUrl', 'slug'), getQueryData)()
}
