import { getCollectionsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collections-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { querySelect } from '@echo/firestore/helpers/crud/query/query-select'
import type { Collection } from '@echo/model/types/collection'
import { pipe } from 'ramda'

export function getCollectionsSearchData(): Promise<Collection[]> {
  return pipe(getCollectionsCollectionReference, querySelect('name', 'profilePictureUrl', 'slug'), getQueryData)()
}
