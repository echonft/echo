import { getQueryDocumentsData } from '@echo/firestore/helpers/crud/query/get-query-documents-data'
import { pickSelectConstraintFieldsFromResults } from '@echo/firestore/helpers/crud/query/pick-select-constraint-fields-from-results'
import { addConstraintsToQuery } from '@echo/firestore/helpers/query/add-constraints-to-query'
import type { User } from '@echo/firestore/types/model/user/user'
import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import type { CollectionReference, Query } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getUserQueryResults(constraints?: QueryConstraints<User>) {
  return function (query: Query<User> | CollectionReference<User>) {
    return pipe(
      addConstraintsToQuery(constraints),
      getQueryDocumentsData,
      andThen(pickSelectConstraintFieldsFromResults(constraints))
    )(query)
  }
}
