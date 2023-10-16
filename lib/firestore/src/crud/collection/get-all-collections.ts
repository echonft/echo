import { collectionFields } from '@echo/firestore/constants/fields/collection/collection-fields'
import { getCollectionsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collections-collection-reference'
import { getQueryDocumentsData } from '@echo/firestore/helpers/crud/get-query-documents-data'
import { addConstraintsToQuery } from '@echo/firestore/helpers/query/add-constraints-to-query'
import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import type { Collection } from '@echo/model/types/collection'
import type { Query } from 'firebase-admin/lib/firestore'

export async function getAllCollections(constraints?: QueryConstraints) {
  let query = getCollectionsCollectionReference() as Query<Collection>
  query = addConstraintsToQuery(query, constraints, collectionFields)
  return await getQueryDocumentsData(query)
}
