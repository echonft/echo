import { getQueryDocumentsData } from '@echo/firestore/helpers/crud/query/get-query-documents-data'
import { pickSelectConstraintFieldsFromResults } from '@echo/firestore/helpers/crud/query/pick-select-constraint-fields-from-results'
import { addConstraintsToQuery } from '@echo/firestore/helpers/query/add-constraints-to-query'
import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import type { Nft } from '@echo/model/types/nft'
import type { CollectionReference, Query } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getNftQueryResults(constraints?: QueryConstraints<Nft>) {
  return function (query: Query<Nft> | CollectionReference<Nft>) {
    return pipe(
      addConstraintsToQuery(constraints),
      getQueryDocumentsData,
      andThen(pickSelectConstraintFieldsFromResults(constraints))
    )(query)
  }
}
