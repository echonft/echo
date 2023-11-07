import { getCollectionsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collections-collection-reference'
import { getCollectionQueryResults } from '@echo/firestore/helpers/crud/collection/get-collection-query-results'
import { type QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { type Collection } from '@echo/model/types/collection'
import { pipe } from 'ramda'

export function getAllCollections(constraints?: QueryConstraints<Collection>) {
  return pipe(getCollectionsCollectionReference, getCollectionQueryResults(constraints))()
}
