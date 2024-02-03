import { getCollectionsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collections-collection-reference'
import { getQueryUniqueData } from '@echo/firestore/helpers/crud/query/get-query-unique-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { Collection } from '@echo/model/types/collection'
import type { Nullable } from '@echo/utils/types/nullable'
import { pipe } from 'ramda'

export function findCollectionBySlug(slug: string): Promise<Nullable<Collection>> {
  return pipe(getCollectionsCollectionReference, queryWhere<Collection>('slug', '==', slug), getQueryUniqueData)()
}
