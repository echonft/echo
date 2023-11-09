import { getQueryDocumentsData } from '@echo/firestore/helpers/crud/query/get-query-documents-data'
import { pickSelectConstraintFieldsFromResults } from '@echo/firestore/helpers/crud/query/pick-select-constraint-fields-from-results'
import { addConstraintsToQuery } from '@echo/firestore/helpers/query/add-constraints-to-query'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import type { CollectionReference, Query } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getUserQueryResults(constraints?: QueryConstraints<UserDocumentData>) {
  return function (query: Query<UserDocumentData> | CollectionReference<UserDocumentData>) {
    return pipe(
      addConstraintsToQuery(constraints),
      getQueryDocumentsData,
      andThen(pickSelectConstraintFieldsFromResults(constraints))
    )(query)
  }
}
